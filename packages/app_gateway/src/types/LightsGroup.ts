import { ObjectType, Field, ID } from 'type-graphql'
import { LightState } from './LightState'
import { Light } from './Light'

@ObjectType()
export class LightsGroup {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field(() => [Light])
  devices: Light[]

  @Field(() => LightState)
  state: LightState
}
