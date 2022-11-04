import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Roller {
  @Field()
  calibrating: boolean

  @Field()
  current_pos: number

  @Field()
  is_valid: boolean

  @Field()
  last_direction: string

  @Field()
  overtemperature: boolean

  @Field()
  positioning: boolean

  @Field()
  power: number

  @Field()
  safety_switch: boolean

  @Field()
  source: string

  @Field()
  state: string

  @Field()
  stop_reason: string
}
