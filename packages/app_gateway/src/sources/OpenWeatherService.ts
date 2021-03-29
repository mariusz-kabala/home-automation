import { Service } from 'typedi'
import { ConsulService } from './consulService'

export interface IForecastAPIResponse {
  coord: {
    lon: number
    lat: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
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
    gust: number
  }
  rain: {
    '1h': number
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
}

@Service()
export class OpenWeatherService extends ConsulService {
  protected serviceName = 'openWeather'

  public cities(): Promise<string[]> {
    return this.get('cities')
  }

  public getCity(city: string): Promise<IForecastAPIResponse> {
    return this.get<IForecastAPIResponse>(`cities/${city}`)
  }
}
