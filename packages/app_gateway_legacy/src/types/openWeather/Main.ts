import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class OpenWeatherMain {
  @Field()
  temp: number

  @Field()
  feelsLike: number

  @Field()
  tempMin: number

  @Field()
  tempMax: number

  @Field()
  pressure: number

  @Field()
  humidity: number
}
