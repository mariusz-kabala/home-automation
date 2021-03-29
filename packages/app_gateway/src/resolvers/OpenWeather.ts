import { Resolver, Query, Arg } from 'type-graphql'
import { Service } from 'typedi'
import { OpenWeatherService } from 'sources/OpenWeatherService'
import { OpenWeatherForecast } from 'types/openWeather/Forecast'

@Service()
@Resolver(OpenWeatherForecast)
export class OpenWeatherResolver {
  constructor(private readonly service: OpenWeatherService) {}

  @Query(() => [String])
  openWeatherCities(): Promise<string[]> {
    return this.service.cities()
  }

  @Query(() => OpenWeatherForecast)
  async openWeatherForecast(@Arg('city') city: string): Promise<OpenWeatherForecast> {
    const response = await this.service.getCity(city)

    return {
      ...response,
      main: {
        temp: response.main.temp,
        feelsLike: response.main.feels_like,
        tempMin: response.main.temp_min,
        tempMax: response.main.temp_max,
        pressure: response.main.pressure,
        humidity: response.main.humidity,
      },
      rain: {
        oneHour: response.rain['1h'],
      },
    } as any
  }
}
