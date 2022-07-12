import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class AqicnorgIaqi {
  @Field({ nullable: true })
  co?: number

  @Field({ nullable: true })
  dew?: number

  @Field({ nullable: true })
  h?: number

  @Field({ nullable: true })
  no2?: number

  @Field({ nullable: true })
  p?: number

  @Field({ nullable: true })
  pm10?: number

  @Field({ nullable: true })
  pm25?: number

  @Field({ nullable: true })
  r?: number

  @Field({ nullable: true })
  so2?: number

  @Field({ nullable: true })
  o3?: number

  @Field({ nullable: true })
  t?: number

  @Field({ nullable: true })
  w?: number

  @Field({ nullable: true })
  wg?: number
}
