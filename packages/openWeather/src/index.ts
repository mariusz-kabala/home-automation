import fetch from 'node-fetch'
import config from 'config'
import cron from 'node-cron'
import uuid4 from 'uuid'

import { publish } from '@home/mqtt'
import { logger } from '@home/logger'
import { response } from 'express'

export interface IWeather {
  id: number
  main: string
  description: string
  icon: string
}

export interface IForecast {
  coord: {
    lon: number
    lat: number
  }
  weather: IWeather[]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
  traceid?: string
}

const CITIES = ['Szczecin,PL', 'Sosnowiec,PL', 'Miechow,PL', 'Berlin,DE']

async function fetchWeather(city: string): Promise<IForecast> {
  const request = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.get<string>(
      'openWeatherAPIKey',
    )}&units=metric`,
  )

  if (!request.ok) {
    throw response
  }

  const data: IForecast = await request.json()

  return data
}

function publishForecast(city: string, forecast: IForecast): void {
  forecast.traceid = uuid4()
  publish(`forecast/${city}`, forecast)
}

async function run() {
  for (const city of CITIES) {
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
