import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class OpenWeatherSys {
  @Field(() => ID)
  id: number

  @Field()
  type: number

  @Field()
  country: string

  @Field()
  sunrise: number

  @Field()
  sunset: number
}
