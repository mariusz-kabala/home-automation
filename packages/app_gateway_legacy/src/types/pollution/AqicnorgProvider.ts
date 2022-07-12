import { ObjectType, Field } from 'type-graphql'
import { AqicnorgIaqi } from './aqicnorg/Iaqi'
import { AqicnorgTime } from './aqicnorg/Time'
import { AqicnorgForecast } from './aqicnorg/Forecast'

@ObjectType()
export class AqicnorgProvider {
  @Field()
  city: string

  @Field(() => [Number])
  coordinates: number[]

  @Field()
  aqi: number

  @Field()
  idx: number

  @Field()
  dominentpol: string

  @Field(() => AqicnorgIaqi)
  iaqi: AqicnorgIaqi

  @Field(() => AqicnorgTime)
  time: AqicnorgTime

  @Field(() => AqicnorgForecast)
  forecast: AqicnorgForecast
}
