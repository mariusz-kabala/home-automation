/* eslint-disable @typescript-eslint/camelcase */
import { subscribe } from '@home/mqtt'
import { logger } from '@home/logger'
import { Point } from '@influxdata/influxdb-client'

import { sensorsWriteApi } from '../clients/db'

interface IForecastMsg {
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  name: string
  id: number
  visibility: number
}

export function subscribeForOpenWeatherReports() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribe('forecast/#', async (msg: IForecastMsg) => {
    const {
      name,
      id,
      visibility,
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      wind: { speed, deg },
      clouds: { all },
    } = msg

    const point = new Point('forecast')
      .tag('cityName', name)
      .tag('cityId', `${id}`)
      .intField('visibility', visibility)
      .floatField('temp', temp)
      .floatField('feels_like', feels_like)
      .floatField('temp_min', temp_min)
      .floatField('temp_max', temp_max)
      .intField('pressure', pressure)
      .intField('humidity', humidity)
      .floatField('windSpeed', speed)
      .intField('windDeg', deg)
      .intField('clouds', all)

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
