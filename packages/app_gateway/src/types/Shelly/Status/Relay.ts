import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Relay {
  @Field()
  ison: boolean

  @Field()
  has_timer: boolean

  @Field()
  timer_started: number

  @Field()
  timer_duration: number

  @Field()
  timer_remaining: number

  @Field()
  overpower: boolean

  @Field()
  overtemperature: boolean

  @Field()
  is_valid: boolean

  @Field()
  source: string
}
