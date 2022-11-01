import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Cloud {
  @Field()
  enabled: boolean

  @Field()
  connected: boolean
}
