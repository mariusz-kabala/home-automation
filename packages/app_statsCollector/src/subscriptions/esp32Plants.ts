import { subscribe } from '@home/mqtt'
import { logger } from '@home/logger'
import { Point } from '@influxdata/influxdb-client'

import { sensorsWriteApi } from '../clients/db'

export function subscribeForPlantsReports() {
  subscribe(
    'esp32/plants/+',
    async (
      msg: {
        humidity: number
        temperature: number
        moisture: number
      },
      topic: string,
    ) => {
      const [, , device] = topic.split('/')

      const point = new Point('plant')
        .tag('device', device)
        .intField('humidity', msg.humidity)
        .intField('temperature', msg.temperature)
        .intField('moisture', msg.moisture)

      sensorsWriteApi.writePoint(point)

      try {
        await sensorsWriteApi.flush()
      } catch (err) {
        logger.log({
          level: 'error',
          message: err,
        })
      }
    },
  )
}
