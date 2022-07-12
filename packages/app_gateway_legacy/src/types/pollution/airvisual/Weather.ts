import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class AirvisualWeather {
  @Field()
  ts: string

  @Field()
  tp: number

  @Field()
  pr: number

  @Field()
  hu: number

  @Field()
  ws: number

  @Field()
  wd: number

  @Field()
  ic: string
}
