import { subscribe } from '@home/mqtt'
import { logger } from '@home/logger'
import { influx } from '../clients/db'

export function subscribeForPlugReports() {
  subscribe('tuyaPlugs/+/status', async (msg: any, topic: string) => {
    const [, device] = topic.split('/')

    try {
      await influx.writePoints([
        {
          measurement: 'tuyaPlugs',
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
      message: `Saving new tuyaPlugs report ${JSON.stringify(msg)}`,
      device,
    })
  })
}
