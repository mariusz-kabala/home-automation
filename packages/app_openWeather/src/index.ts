import fetch from 'node-fetch'
import config from 'config'
import cron from 'node-cron'
import { v4 as uuid4 } from 'uuid'
import { publish } from '@home/mqtt'
import { logger } from '@home/logger'

import { IForecast } from './types'

async function fetchWeather(city: string): Promise<IForecast> {
  const request = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.get<string>(
      'openWeatherAPIKey',
    )}&units=metric`,
  )

  if (!request.ok) {
    throw request
  }

  const data: IForecast = await request.json()
  return data
}

function publishForecast(city: string, forecast: IForecast): void {
  forecast.traceid = uuid4()
  publish(`forecast/${city}`, forecast)
}

async function run() {
  for (const city of config.get<string[]>('cities')) {
    try {
      const forecast = await fetchWeather(city)
      publishForecast(city, forecast)
      logger.log({
        level: 'info',
        message: `Publishing a new forecast for ${city}`,
        city,
      })
    } catch (err) {
      logger.log({
        level: 'error',
        message: err,
      })
    }
  }
}

logger.log({
  level: 'info',
  message: 'OpenWeather started',
})

run()

cron.schedule('*/5 * * * *', run)
