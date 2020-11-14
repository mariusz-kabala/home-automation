import { subscribe } from '@home/mqtt'
import { logger } from '@home/logger'
import { Point } from '@influxdata/influxdb-client'

import { writeApi } from '../clients/db'

const SUPPORTED_TYPES = [
  'ZHALightLevel',
  'ZHATemperature',
  'ZHAPresence',
  'ZHASwitch',
  'ZHAHumidity',
  'ZHAPressure',
  'ZHAPower',
  'ZHAConsumption',
]

export function subscribeForZigbeeSensors() {
  subscribe(
    'zigbee/sensors/+',
    async (msg: {
      type: string
      state: { [key: string]: number | string | boolean }
      uniqueid: number
      name: string
      traceid: string
    }) => {
      const { type, state, uniqueid, name } = msg

      if (SUPPORTED_TYPES.includes(type) && state) {
        const point = new Point(type).tag('deviceId', `${uniqueid}`).tag('deviceName', name)

        for (const field of Object.keys(state)) {
          switch (typeof state[field]) {
            case 'string':
              point.stringField(field, state[field])
              break

            case 'number':
              point.intField(field, state[field])
              break

            case 'boolean':
              point.booleanField(field, state[field])
              break

            default:
              break
          }
        }

        writeApi.writePoint(point)

        try {
          await writeApi.flush()
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
