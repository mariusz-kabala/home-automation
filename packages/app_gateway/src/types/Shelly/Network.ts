import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Network {
  @Field()
  isOn: boolean

  @Field()
  lastUpdate: Date
}
