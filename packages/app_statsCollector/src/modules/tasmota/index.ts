import { subscribe } from '@home/mqtt'
import { logger } from '@home/logger'
import { Point } from '@influxdata/influxdb-client'
import { client } from '../../clients/db'
import { writeToPoint } from '../../helpers/point'
import config from 'config'

const BUCKET = 'home'
const ORGANISATION = config.get<string>('organisation')

async function onMessage(payload: any, topic: string) {
  const [_, deviceId] = topic.split('/')

  const writeAPI = client.getWriteApi(ORGANISATION, BUCKET, 'ms')

  for (const key of Object.keys(payload)) {
    const value = payload[key]
    if (typeof value !== 'object') {
      continue
    }

    const { Id, Temperature } = value

    const point = new Point('temperature').tag('deviceName', `${deviceId}_${Id}`)
    writeToPoint(point, Temperature)
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

export async function run() {
  const devices = config.get<string[]>('tasmota')

  for (const device of devices) {
    subscribe(`tele/${device}/SENSOR`, onMessage)
    logger.log({
      level: 'info',
      message: `subscribed to: tele/${device}/SENSOR`,
    })
  }
}
