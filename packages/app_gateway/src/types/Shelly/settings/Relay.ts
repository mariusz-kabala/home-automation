import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Relay {
  @Field(() => String, { nullable: true })
  name: string | null

  @Field()
  appliance_type: string

  @Field()
  ison: boolean

  @Field()
  has_timer: boolean

  @Field()
  default_state: string

  @Field()
  btn_type: string

  @Field()
  btn_reverse: number

  @Field()
  auto_on: number

  @Field()
  auto_off: number

  @Field()
  max_power: number

  @Field()
  schedule: false

  @Field()
  schedule_rules: [] // no idea how it looks like
}
