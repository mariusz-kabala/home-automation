import { subscribe } from '@home/mqtt'
import { logger } from '@home/logger'
import { Point } from '@influxdata/influxdb-client'

import { sensorsWriteApi } from '../clients/db'

interface IAirvisualMsg {
  current: {
    pollution: {
      ts: string
      aqius: number
      mainus: string
      aqicn: number
      maincn: string
    }
  }
}

interface IAqicnorgMsg {
  aqi: number
  idx: number
  iaqiCO: number // float
  iaqiNO2: number // float
  iaqiPM25: number
  iaqiSO2: number // float
  iaqiP: number
}

export function subscribeForPollutionReports() {
  subscribe('airvisual/+', async (msg: IAirvisualMsg, topic: string) => {
    const [, city] = topic.split('/')
    const {
      current: {
        pollution: { ts, aqius, mainus, aqicn, maincn },
      },
    } = msg

    const point = new Point('pollution')
      .tag('type', 'airvisual')
      .tag('city', city)
      .stringField('ts', ts)
      .intField('aqius', aqius)
      .intField('aqicn', aqicn)
      .intField('mainus', mainus)
      .intField('maincn', maincn)

    sensorsWriteApi.writePoint(point)

    try {
      await sensorsWriteApi.flush()
    } catch (err) {
      logger.log({
        level: 'error',
        message: err,
      })
    }
  })

  subscribe('aqicnorg/+', async (msg: IAqicnorgMsg, topic: string) => {
    const [, city] = topic.split('/')
    const { aqi, idx, iaqiCO, iaqiNO2, iaqiPM25, iaqiSO2, iaqiP } = msg

    const point = new Point('pollution')
      .tag('type', 'aqicnorg')
      .tag('city', city)
      .intField('aqi', aqi)
      .intField('idx', idx)
      .floatField('iaqiCO', iaqiCO)
      .floatField('iaqiNO2', iaqiNO2)
      .intField('iaqiPM25', iaqiPM25)
      .floatField('iaqiSO2', iaqiSO2)
      .intField('iaqiP', iaqiP)

    sensorsWriteApi.writePoint(point)

    try {
      await sensorsWriteApi.flush()
    } catch (err) {
      logger.log({
        level: 'error',
        message: err,
      })
    }
  })
}
