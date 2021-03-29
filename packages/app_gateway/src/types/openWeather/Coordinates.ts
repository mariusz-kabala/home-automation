import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class OpenWeatherCoordinates {
  @Field()
  lon: number

  @Field()
  lat: number
}
