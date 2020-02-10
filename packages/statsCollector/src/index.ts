import { logger } from '@home/logger'

import { createDBIfNeeded } from './clients/db'
import { subscribeForPollutionReports } from './subscriptions/pollutionReports'
import { subscribeForOpenWeatherReports } from './subscriptions/openweather'
import { subscribeForPlugReports } from './subscriptions/tuyaPlugs'
import { subscribeForZigbeeSensors } from './subscriptions/zigbee'

async function start() {
  await createDBIfNeeded('home')

  logger.log({
    level: 'info',
    message: 'Application started',
  })

  subscribeForPollutionReports()
  subscribeForOpenWeatherReports()
  subscribeForPlugReports()
  subscribeForZigbeeSensors()
}

start()
