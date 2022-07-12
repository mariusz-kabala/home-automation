import { InputType, Field } from 'type-graphql'
import { LightState } from 'types/LightState'

@InputType()
export class LightStateInput implements Partial<LightState> {
  @Field({ nullable: true })
  bri: number

  @Field({ nullable: true })
  colormode: string

  @Field({ nullable: true })
  ct: number

  @Field({ nullable: true })
  effect: string

  @Field({ nullable: true })
  hue: number

  @Field()
  on: boolean

  @Field()
  reachable: boolean

  @Field({ nullable: true })
  sat: number

  @Field(() => [Number], { nullable: true })
  xy: number[]
}
