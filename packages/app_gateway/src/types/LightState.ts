import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class LightState {
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
