import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Coiot {
  @Field()
  enabled: boolean

  @Field()
  update_period: number

  @Field()
  peer: string
}
