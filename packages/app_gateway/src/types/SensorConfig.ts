import { ObjectType, Field, InterfaceType } from 'type-graphql'

@InterfaceType()
export abstract class DaylightSensorConfig {
  @Field({ nullable: true })
  configured: boolean

  @Field({ nullable: true })
  on: boolean

  @Field({ nullable: true })
  sunriseoffset: number

  @Field({ nullable: true })
  sunsetoffset: number
}

ObjectType()
export class MontionSensorConfig {
    @Field({ nullable: true })
  alert: string

  @Field({ nullable: true })
  battery: number

  @Field({ nullable: true })
  deplay: number

  @Field({ nullable: true })
  ledindication: boolean

  @Field({ nullable: true })
  on: boolean

  @Field({ nullable: true })
  reachable: boolean

  @Field({ nullable: true })
  sensitivity: number

  @Field({ nullable: true })
  sensitivitymax: number

  @Field({ nullable: true })
  tholddark: number

  @Field({ nullable: true })
  tholdoffset: number

  @Field({ nullable: true })
  usertest: boolean
}

ObjectType()
export class DoorSensorConfig {
    @Field({ nullable: true })
  battery: boolean

  @Field()
  on: boolean

  @Field()
  reachable: boolean

  @Field()
  temperature: boolean
}

ObjectType()
export class MultiSensorConfig {
  @Field()
  battery: boolean

  @Field()
  on: boolean

  @Field()
  reachable: boolean

  @Field({ nullable: true })
  offset: number
}

export type SensorConfig = DaylightSensorConfig | DoorSensorConfig | MultiSensorConfig
