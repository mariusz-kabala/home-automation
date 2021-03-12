import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class DaylightSensorState {
  @Field()
  dark: boolean

  @Field()
  daylight: boolean

  @Field()
  lastupdated: string

  @Field()
  status: number

  @Field()
  sunrise: string

  @Field()
  sunset: string
}

@ObjectType()
export class PresenceSensorState {
  @Field()
  presence: boolean

  @Field()
  lastupdated: string
}

@ObjectType()
export class TemperatureSensorState {
  @Field()
  temperature: number

  @Field()
  lastupdated: string
}

@ObjectType()
export class LightSensorState {
  @Field()
  dark: boolean

  @Field()
  daylight: boolean

  @Field()
  lastupdated: string

  @Field()
  lightlevel: number

  @Field()
  lux: number
}

@ObjectType()
export class DoorSensorState {
  @Field()
  open: boolean

  @Field()
  lastupdated: string
}

@ObjectType()
export class HumiditySensorState {
  @Field()
  humidity: number

  @Field()
  lastupdated: string
}

@ObjectType()
export class PressureSensorState {
  @Field()
  pressure: number

  @Field()
  lastupdated: string
}

@ObjectType()
export class EnergyConsumptionSensorState {
  @Field()
  consumption: number

  @Field()
  lastupdated: string
}

@ObjectType()
export class PowerSensorState {
  @Field()
  current: number

  @Field()
  power: number

  @Field()
  voltage: number

  @Field()
  lastupdated: string
}
