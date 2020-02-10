import { subscribe } from '@home/mqtt'
import { logger } from '@home/logger'

import { influx } from '../clients/db'

const SUPPORTED_TYPES = ['ZHALightLevel', 'ZHATemperature', 'ZHAPresence', 'ZHASwitch', 'ZHAHumidity', 'ZHAPressure']

export function subscribeForZigbeeSensors() {
  subscribe(
    'zigbee/sensors/#',
    async (msg: {
      type: string
      state: { [key: string]: number | string | boolean }
      id: number
      name: string
      traceid: string
    }) => {
      const { type, state, id, name } = msg

      if (SUPPORTED_TYPES.includes(type) && state) {
        try {
          await influx.writePoints([
            {
              measurement: type,
              tags: { deviceId: `${id}`, deviceName: name },
              fields: state,
            },
          ])
          logger.info({
            level: 'info',
            traceid: msg.traceid,
            message: `Saving new measurement ${JSON.stringify(state)}`,
            deviceId: id,
            deviceName: name,
            measurement: type,
          })
        } catch (err) {
          logger.log({
            level: 'error',
            message: err,
          })
        }
      }
    },
  )
}
