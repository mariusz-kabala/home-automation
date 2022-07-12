import { ObjectType, Field } from 'type-graphql'
import { AirvisualWeather } from './airvisual/Weather'
import { AirvisualPollution } from './airvisual/Pollution'

@ObjectType()
export class AirvisualProvider {
  @Field()
  city: string

  @Field()
  state: string

  @Field()
  country: string

  @Field(() => [Number])
  coordinates: number[]

  @Field(() => AirvisualWeather)
  weather: AirvisualWeather

  @Field(() => AirvisualPollution)
  pollution: AirvisualPollution
}
