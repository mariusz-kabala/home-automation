import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class CloudSettings {
  @Field()
  enabled: boolean

  @Field()
  connected: boolean
}
