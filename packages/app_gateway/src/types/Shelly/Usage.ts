import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Usage {
  @Field()
  isOn: boolean

  @Field()
  lastUpdate: Date
}
