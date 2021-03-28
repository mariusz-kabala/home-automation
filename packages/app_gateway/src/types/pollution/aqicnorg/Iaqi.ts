import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class AqicnorgIaqi {
  @Field()
  co: number

  @Field()
  dew: number

  @Field()
  h: number

  @Field()
  no2: number

  @Field()
  p: number

  @Field()
  pm10: number

  @Field()
  pm25: number

  @Field()
  r: number

  @Field()
  so2: number

  @Field()
  t: number

  @Field()
  w: number
}
