import { Service } from 'typedi'
import { ConsulService } from './consulService'

export type AqicnorgIaqiValue = {
  v: number
}

export type AqicnorgForecastValue = {
  avg: number
  day: string
  max: number
  min: number
}
export interface IAirvisualAPIResponse {
  status: string
  data: {
    city: string
    state: string
    country: string
    location: {
      type: string
      coordinates: number[]
    }
    current: {
      weather: {
        ts: string
        tp: number
        pr: number
        hu: number
        ws: number
        wd: number
        ic: string
      }
      pollution: {
        ts: string
        aqius: number
        mainus: string
        aqicn: number
        maincn: string
      }
    }
  }
}

export interface IAqicnorgAPIResponse {
  status: string
  data: {
    aqi: number
    idx: number
    attributions: {
      url: string
      name: string
      logo?: string
    }[]
    city: {
      geo: number[]
      name: string
      url: string
    }
    dominentpol: string
    iaqi: {
      co: AqicnorgIaqiValue
      dew: AqicnorgIaqiValue
      h: AqicnorgIaqiValue
      no2: AqicnorgIaqiValue
      p: AqicnorgIaqiValue
      pm10: AqicnorgIaqiValue
      pm25: AqicnorgIaqiValue
      r: AqicnorgIaqiValue
      so2: AqicnorgIaqiValue
      t: AqicnorgIaqiValue
      w: AqicnorgIaqiValue
    }
    time: {
      s: string
      tz: string
      v: number
      iso: string
    }
    forecast: {
      daily: {
        o3: AqicnorgForecastValue[]
        pm10: AqicnorgForecastValue[]
        pm25: AqicnorgForecastValue[]
        uvi: AqicnorgForecastValue[]
      }
    }
  }
}

export interface ICityResponse {
  airvisual: IAirvisualAPIResponse
  aqicnorg: IAqicnorgAPIResponse
}

@Service()
export class PollutionReportsService extends ConsulService {
  protected serviceName = 'pollutionReports'

  public cities(): Promise<string[]> {
    return this.get('cities')
  }

  public providers(): Promise<string[]> {
    return this.get('providers')
  }

  public getCity(city: string): Promise<ICityResponse> {
    return this.get<ICityResponse>(`city/${city}`)
  }

  public getProvider<T = IAirvisualAPIResponse | IAqicnorgAPIResponse>(
    provider: string,
  ): Promise<{ [city: string]: T }> {
    return this.get<{ [city: string]: T }>(`provider/${provider}`)
  }
}
