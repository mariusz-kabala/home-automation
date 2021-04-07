import { Resolver, Query, Arg } from 'type-graphql'
import { Service } from 'typedi'
import { City } from 'types/pollution/City'
import { AirvisualProvider } from 'types/pollution/AirvisualProvider'
import { AqicnorgProvider } from 'types/pollution/AqicnorgProvider'
import { PollutionReportsService, IAirvisualAPIResponse, IAqicnorgAPIResponse } from 'sources/PollutionReportsService'

@Service()
@Resolver()
export class PollutionResolver {
  constructor(private readonly service: PollutionReportsService) {}

  @Query(() => [String])
  pollutionCities(): Promise<string[]> {
    return this.service.cities()
  }

  @Query(() => [String])
  pollutionProviders(): Promise<string[]> {
    return this.service.providers()
  }

  @Query(() => City)
  async pollutionCity(@Arg('name') name: string): Promise<City> {
    const { airvisual, aqicnorg } = await this.service.getCity(name)

    return {
      airvisual: {
        city: airvisual.data.city,
        state: airvisual.data.state,
        country: airvisual.data.country,
        coordinates: airvisual.data.location.coordinates,
        weather: airvisual.data.current.weather,
        pollution: airvisual.data.current.pollution,
      },
      aqicnorg: {
        city: aqicnorg.data.city.name,
        coordinates: aqicnorg.data.city.geo,
        aqi: aqicnorg.data.aqi,
        idx: aqicnorg.data.idx,
        dominentpol: aqicnorg.data.dominentpol,
        iaqi: {
          co: aqicnorg.data.iaqi.co?.v,
          dew: aqicnorg.data.iaqi.dew?.v,
          h: aqicnorg.data.iaqi.h?.v,
          no2: aqicnorg.data.iaqi.no2?.v,
          p: aqicnorg.data.iaqi.p?.v,
          pm10: aqicnorg.data.iaqi.pm10?.v,
          pm25: aqicnorg.data.iaqi.pm25?.v,
          r: aqicnorg.data.iaqi.r?.v,
          so2: aqicnorg.data.iaqi.so2?.v,
          o3: aqicnorg.data.iaqi.o3?.v,
          t: aqicnorg.data.iaqi.t?.v,
          w: aqicnorg.data.iaqi.w?.v,
          wg: aqicnorg.data.iaqi.wg?.v,
        },
        time: aqicnorg.data.time,
        forecast: {
          o3: aqicnorg.data.forecast.daily.o3,
          pm10: aqicnorg.data.forecast.daily.pm10,
          pm25: aqicnorg.data.forecast.daily.pm25,
          uvi: aqicnorg.data.forecast.daily.uvi,
        },
      },
    }
  }

  @Query(() => [AirvisualProvider])
  async airvisual(): Promise<AirvisualProvider[]> {
    const response = await this.service.getProvider<IAirvisualAPIResponse>('airvisual')

    return Object.keys(response).map(city => ({
      city: response[city].data.city,
      state: response[city].data.state,
      country: response[city].data.country,
      coordinates: response[city].data.location.coordinates,
      weather: response[city].data.current.weather,
      pollution: response[city].data.current.pollution,
    }))
  }

  @Query(() => [AqicnorgProvider])
  async aqicnorg(): Promise<AqicnorgProvider[]> {
    const response = await this.service.getProvider<IAqicnorgAPIResponse>('aqicnorg')

    return Object.keys(response).map(city => ({
      city: response[city].data.city.name,
      coordinates: response[city].data.city.geo,
      aqi: response[city].data.aqi,
      idx: response[city].data.idx,
      dominentpol: response[city].data.dominentpol,
      iaqi: {
        co: response[city].data.iaqi.co.v,
        dew: response[city].data.iaqi.dew.v,
        h: response[city].data.iaqi.h.v,
        no2: response[city].data.iaqi.no2.v,
        p: response[city].data.iaqi.p.v,
        pm10: response[city].data.iaqi.pm10.v,
        pm25: response[city].data.iaqi.pm25.v,
        r: response[city].data.iaqi.r.v,
        so2: response[city].data.iaqi.so2.v,
        t: response[city].data.iaqi.t.v,
        w: response[city].data.iaqi.w.v,
      },
      time: response[city].data.time,
      forecast: {
        o3: response[city].data.forecast.daily.o3,
        pm10: response[city].data.forecast.daily.pm10,
        pm25: response[city].data.forecast.daily.pm25,
        uvi: response[city].data.forecast.daily.uvi,
      },
    }))
  }
}
