import { logger } from '@home/logger'

import { subscribeForPollutionReports } from './subscriptions/pollutionReports'
import { subscribeForOpenWeatherReports } from './subscriptions/openweather'
import { subscribeForPlugReports } from './subscriptions/tuyaPlugs'
import { subscribeForZigbeeSensors, subscribeForZigbeeLights, subscribeForZigbeeGroups } from './subscriptions/zigbee'
import { subscribeForPlantsReports } from './subscriptions/esp32Plants'
import { registerInConsul } from '@home/commons'

function start() {
  logger.log({
    level: 'info',
    message: 'Application started',
  })

  subscribeForPollutionReports()
  subscribeForOpenWeatherReports()
  subscribeForPlugReports()
  subscribeForZigbeeSensors()
  subscribeForPlantsReports()
  subscribeForZigbeeLights()
  subscribeForZigbeeGroups()
}

registerInConsul('statsCollector')
start()
