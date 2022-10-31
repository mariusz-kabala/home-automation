import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Sntp {
  @Field()
  server: string

  @Field()
  enabled: boolean
}
