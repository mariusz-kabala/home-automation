import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class OpenWeatherWind {
  @Field()
  speed: number

  @Field()
  deg: number

  @Field()
  gust: number
}
