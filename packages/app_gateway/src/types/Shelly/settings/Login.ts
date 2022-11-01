import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Login {
  @Field()
  enabled: boolean

  @Field()
  unprotected: boolean

  @Field()
  username: string
}
