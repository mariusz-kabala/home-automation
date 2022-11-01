import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Input {
  @Field()
  input: number

  @Field()
  event: string

  @Field()
  event_cnt: number
}
