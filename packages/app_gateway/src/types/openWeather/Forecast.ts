import { ObjectType, Field, ID } from 'type-graphql'
import { OpenWeatherCoordinates } from './Coordinates'
import { OpenWeatherWind } from './Wind'
import { OpenWeatherSys } from './Sys'
import { OpenWeatherMain } from './Main'
import { OpenWeatherWeather } from './Weather'
import { OpenWeatherClouds } from './Clouds'
import { OpenWeatherRain } from './Rain'

@ObjectType()
export class OpenWeatherForecast {
  @Field(() => ID)
  id: number

  @Field(() => OpenWeatherCoordinates)
  coord: OpenWeatherCoordinates

  @Field(() => [OpenWeatherWeather])
  weather: OpenWeatherWeather[]

  @Field()
  base: string

  @Field(() => OpenWeatherMain)
  main: OpenWeatherMain

  @Field()
  visibility: number

  @Field(() => OpenWeatherWind)
  wind: OpenWeatherWind

  @Field(() => OpenWeatherRain)
  rain: OpenWeatherRain

  @Field(() => OpenWeatherClouds)
  clouds: OpenWeatherClouds

  @Field()
  dt: number

  @Field(() => OpenWeatherSys)
  sys: OpenWeatherSys

  @Field()
  timezone: number

  @Field()
  name: string
}
