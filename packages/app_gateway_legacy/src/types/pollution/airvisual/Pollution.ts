import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class AirvisualPollution {
  @Field()
  ts: string

  @Field()
  aqius: number

  @Field()
  mainus: string

  @Field()
  aqicn: number

  @Field()
  maincn: string
}
