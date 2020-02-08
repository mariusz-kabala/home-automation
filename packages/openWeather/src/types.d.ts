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
