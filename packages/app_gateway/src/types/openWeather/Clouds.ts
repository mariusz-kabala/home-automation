import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class OpenWeatherClouds {
  @Field()
  all: number
}
