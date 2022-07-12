import { InputType, Field } from 'type-graphql'

@InputType()
export class LightsGroupStateInput {
  @Field({ nullable: true })
  on: boolean

  @Field({ nullable: true })
  toggle: boolean

  @Field({ nullable: true })
  bri: number

  @Field({ nullable: true })
  hue: number

  @Field({ nullable: true })
  sat: number

  @Field({ nullable: true })
  ct: number

  @Field(() => [Number], { nullable: true })
  xy: number

  @Field({ nullable: true })
  alert: string

  @Field({ nullable: true })
  effect: string

  @Field({ nullable: true })
  colorloopspeed: number

  @Field({ nullable: true })
  transitiontime: number
}
