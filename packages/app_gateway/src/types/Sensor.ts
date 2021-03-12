import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class Sensor {
  @Field(() => ID)
  id: string

  @Field({ nullable: true })
  lastseen: string

  @Field()
  manufacturername: string

  @Field()
  modelid: string

  @Field()
  name: string

  @Field()
  type: string

  @Field()
  uniqueid: string
}
