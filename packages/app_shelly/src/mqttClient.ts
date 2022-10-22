import { ShellyModel } from '@home/models'
import { subscribe } from '@home/mqtt'
import { logger } from '@home/logger'

async function onLightDeviceMessage(payload: string, topic: string) {
  const [_prefix, id, _, relay] = topic.split('/')

  const isOn = `${payload}` === 'on' ? true : false

  const device = await ShellyModel.findOne({
    'settings.mqtt.id': id,
  })

  if (!device || device.usage?.isOn === isOn) {
    return
  }

  await ShellyModel.findOneAndUpdate(
    {
      'settings.mqtt.id': id,
    },
    {
      [`status.relays.${relay}.ison`]: isOn,
      usage: {
        isOn,
        lastUpdate: new Date(),
      },
    },
    { new: false },
  )
}

export async function start() {
  const devices = await ShellyModel.find({
    'settings.mode': 'relay',
  })

  logger.log({
    level: 'info',
    message: `${devices.length} shelly devices found`,
  })

  for (const device of devices) {
    const id = device.settings?.mqtt?.id
    if (!id || device.settings?.mode !== 'relay') {
      continue
    }

    const relays = device.settings.relays.length

    for (let x = 0; x < relays; x++) {
      const topic = `shellies/${id}/relay/${x}`

      subscribe(topic, onLightDeviceMessage)
      logger.log({
        level: 'info',
        message: `Subscribed to: ${topic}`,
      })
    }
  }
}
