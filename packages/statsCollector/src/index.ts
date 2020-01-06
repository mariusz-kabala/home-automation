import { subscribe } from '@home/mqtt'
import { logger } from '@home/logger'

import { createDBIfNeeded, influx } from './clients/db'

const SUPPORTED_TYPES = ['ZHALightLevel', 'ZHATemperature', 'ZHAPresence', 'ZHASwitch', 'ZHAHumidity', 'ZHAPressure']

async function start() {
  await createDBIfNeeded('home')

  subscribe('sensors/#', async (msg: any) => {
    const { type, state, id, name } = msg

    if (SUPPORTED_TYPES.includes(type) && state) {
      try {
        await influx.writePoints([
          {
            measurement: type,
            tags: { deviceId: id, deviceName: name },
            fields: state,
          },
        ])
      } catch (err) {
        logger.log({
          level: 'error',
          message: err,
        })
      }
    }
  })

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
    } catch (err) {
      logger.log({
        level: 'error',
        message: err,
      })
    }
  })
}

start()
