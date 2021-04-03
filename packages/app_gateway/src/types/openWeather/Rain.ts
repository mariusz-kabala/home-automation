import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class OpenWeatherRain {
  @Field({ nullable: true })
  oneHour?: number
}
