import { ObjectType, Field } from 'type-graphql'

ObjectType()
export class DaylightSensorConfig {
  @Field()
  configured: boolean

  @Field()
  on: boolean

  @Field()
  sunriseoffset: number

  @Field()
  sunsetoffset: number
}

ObjectType()
export class MontionSensorConfig {
  @Field()
  alert: string

  @Field()
  battery: number

  @Field()
  deplay: number

  @Field()
  ledindication: boolean

  @Field()
  on: boolean

  @Field()
  reachable: boolean

  @Field({ nullable: true })
  sensitivity: number

  @Field({ nullable: true })
  sensitivitymax: number

  @Field({ nullable: true })
  tholddark: number

  @Field({ nullable: true })
  tholdoffset: number

  @Field()
  usertest: boolean
}

ObjectType()
export class DoorSensorConfig {
  @Field()
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
