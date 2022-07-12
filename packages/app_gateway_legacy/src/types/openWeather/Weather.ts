import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class OpenWeatherWeather {
  @Field(() => ID)
  id: number

  @Field()
  main: string

  @Field()
  description: string

  @Field()
  icon: string
}
