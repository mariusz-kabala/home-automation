import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Device {
  @Field()
  type: string

  @Field()
  mac: string

  @Field()
  hostname: string

  @Field()
  num_outputs: number

  @Field()
  num_meters: number

  @Field()
  num_rollers: number

  @Field()
  mode: string
}
