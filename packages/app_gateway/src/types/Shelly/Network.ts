import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Network {
  @Field()
  wifi: string

  @Field()
  address: string

  @Field()
  isConnected: boolean
}
