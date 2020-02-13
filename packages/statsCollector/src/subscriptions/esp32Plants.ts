import { subscribe } from '@home/mqtt'
import { logger } from '@home/logger'

import { influx } from '../clients/db'

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

      try {
        await influx.writePoints([
          {
            measurement: 'plants',
            tags: { device },
            fields: {
              ...msg,
            },
          },
        ])
      } catch (err) {
        logger.log({
          level: 'error',
          message: err,
        })
        return
      }

      logger.info({
        level: 'info',
        message: `Saving new ESP32 Plants report ${JSON.stringify(msg)}`,
        device,
      })
    },
  )
}
