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

start()
