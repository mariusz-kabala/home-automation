import fetch from 'node-fetch'
import config from 'config'
import cron from 'node-cron'

import { publish } from '@home/mqtt'
import { logger } from '@home/logger'

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
}

const CITIES = ['Szczecin,PL', 'Sosnowiec,PL', 'Miechow,PL', 'Berlin,DE']

async function fetchWeather(city: string): Promise<IForecast> {
  const request = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.get<string>(
      'openWeatherAPIKey',
    )}&units=metric`,
  )
  const data: IForecast = await request.json()

  return data
}

function publishForecast(city: string, forecast: IForecast): void {
  publish(`forecast/${city}`, forecast)
}

async function run() {
  for (const city of CITIES) {
    try {
      const forecast = await fetchWeather(city)
      publishForecast(city, forecast)
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
