/* eslint-disable @typescript-eslint/camelcase */
import { subscribe } from '@home/mqtt'
import { logger } from '@home/logger'

import { influx } from '../clients/db'

export function subscribeForOpenWeatherReports() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribe('forecast/#', async (msg: any) => {
    const {
      name,
      id,
      visibility,
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      wind: { speed, deg },
      clouds: { all },
    } = msg
    try {
      await influx.writePoints([
        {
          measurement: 'forecast',
          tags: { cityName: name, cityId: id },
          fields: {
            visibility,
            temp,
            feels_like,
            temp_min,
            temp_max,
            pressure,
            humidity,
            windSpeed: speed,
            windDeg: deg,
            clouds: all,
          },
        },
      ])
      logger.info({
        level: 'info',
        traceid: msg.traceid,
        message: `Saving new forecast ${JSON.stringify({
          visibility,
          temp,
          feels_like,
          temp_min,
          temp_max,
          pressure,
          humidity,
          windSpeed: speed,
          windDeg: deg,
          clouds: all,
        })}`,
        cityName: name,
        cityId: id,
      })
    } catch (err) {
      logger.log({
        level: 'error',
        message: err,
      })
    }
  })
}
