import { subscribe } from '@home/mqtt'
import { logger } from '@home/logger'
import { influx } from '../clients/db'

export function subscribeForPollutionReports() {
  subscribe('airvisual/+', async (msg: any, topic: string) => {
    const [, city] = topic.split('/')

    try {
      await influx.writePoints([
        {
          measurement: 'pollution',
          tags: { type: 'airvisual', city },
          fields: {
            ...msg.current.pollution,
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
      traceid: msg.traceid,
      message: `Saving new pollution report ${JSON.stringify(msg)}`,
      cityName: city,
      provider: 'airvisual',
    })
  })

  subscribe('aqicnorg/+', async (msg: any, topic: string) => {
    const [, city] = topic.split('/')
    try {
      await influx.writePoints([
        {
          measurement: 'pollution',
          tags: { type: 'aqicnorg', city },
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
      traceid: msg.traceid,
      message: `Saving new pollution report ${JSON.stringify(msg)}`,
      cityName: city,
      provider: 'aqicnorg',
    })
  })
}
