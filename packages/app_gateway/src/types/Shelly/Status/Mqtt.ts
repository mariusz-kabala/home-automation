import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Mqtt {
  @Field()
  connected: boolean
}
