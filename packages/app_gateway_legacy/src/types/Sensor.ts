import { ObjectType, Field, ID } from 'type-graphql'
import { SensorConfig } from './SensorConfig'
import { SensorState } from './SensorState'

@ObjectType()
export class Sensor {
  @Field(() => ID)
  id: string

  @Field({ nullable: true })
  lastseen: string

  @Field()
  manufacturername: string

  @Field()
  modelid: string

  @Field()
  name: string

  @Field()
  type: string

  @Field()
  uniqueid: string

  @Field()
  state: SensorState

  @Field()
  config: SensorConfig
}
