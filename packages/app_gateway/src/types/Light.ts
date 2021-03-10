import { ObjectType, Field, ID } from 'type-graphql'
import { LightState } from './LightState'

@ObjectType()
export class Light {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  type: string

  @Field()
  lastseen: string

  @Field()
  manufacturername: string

  @Field()
  modelid: string

  @Field()
  hascolor: boolean

  @Field(() => LightState)
  state: LightState
}
