import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class ApRoaming {
  @Field()
  enabled: boolean

  @Field()
  threshold: number
}
