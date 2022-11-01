import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Meter {
  @Field()
  power: number

  @Field()
  overpower: number

  @Field()
  is_valid: boolean

  @Field()
  timestamp: number

  @Field(() => [Number])
  counters: number[]

  @Field()
  total: number
}
