import { logger } from '@home/logger'
import { IShelly, ShellyModel, ShellyType } from '@home/models'
import { subscribe } from '@home/mqtt'
import { client } from '../../clients/db'
import { Point } from '@influxdata/influxdb-client'
import { writeToPoint } from '../../helpers/point'
import config from 'config'

let devices: IShelly[] = []
const BUCKET = 'lights'
const ORGANISATION = config.get<string>('organisation')

async function onMessage(payload: any, topic: string) {
  const [_, id, relayOrField, relayNr, field] = topic.split('/')

  const writeAPI = client.getWriteApi(ORGANISATION, BUCKET, 'ms')

  if (relayOrField !== 'relay') {
    const point = new Point(relayOrField).tag('deviceName', id)
    writeToPoint(point, payload)
    writeAPI.writePoint(point)
  } else {
    const point = new Point(field).tag('deviceName', `${id}-relay-${relayNr}`)
    writeToPoint(point, payload)
    writeAPI.writePoint(point)
  }

  try {
    await writeAPI.flush()
  } catch (err) {
    logger.log({
      level: 'error',
      message: `${err}`,
    })
  }
}

async function fetchDevicesList() {
  devices = await ShellyModel.find({
    type: {
      $in: [ShellyType.shelly1pm, ShellyType.shellyswitch25],
    },
  })
}

export async function run() {
  await fetchDevicesList()

  for (const device of devices) {
    const id = device.settings?.mqtt?.deviceId

    if (!id || device.settings?.mode !== 'relay') {
      continue
    }

    const relays = device.settings.relays.length

    for (let x = 0; x < relays; x++) {
      subscribe(`shellies/${id}/relay/${x}/power`, onMessage)
      subscribe(`shellies/${id}/relay/${x}/energy`, onMessage)

      logger.log({
        level: 'info',
        message: `subscribed to: shellies/${id}/relay/${x}/power`,
      })
      logger.log({
        level: 'info',
        message: `subscribed to: shellies/${id}/relay/${x}/energy`,
      })
    }

    subscribe(`shellies/${id}/temperature`, onMessage)

    logger.log({
      level: 'info',
      message: `subscribed to: shellies/${id}/temperature`,
    })
  }
}
