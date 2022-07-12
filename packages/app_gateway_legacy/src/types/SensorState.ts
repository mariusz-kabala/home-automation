import { ObjectType, Field, InterfaceType } from 'type-graphql'

@InterfaceType()
export abstract class DaylightSensorState {
  @Field({ nullable: true })
  dark?: boolean

  @Field({ nullable: true })
  daylight?: boolean

  @Field({ nullable: true })
  status?: number

  @Field({ nullable: true })
  sunrise?: string

  @Field({ nullable: true })
  sunset?: string
}

@InterfaceType()
export abstract class PresenceSensorState {
  @Field({ nullable: true })
  presence?: boolean
}

@InterfaceType()
export abstract class TemperatureSensorState {
  @Field({ nullable: true })
  temperature?: number
}

@InterfaceType()
export abstract class LightSensorState {
  @Field({ nullable: true })
  dark?: boolean

  @Field({ nullable: true })
  daylight?: boolean

  @Field({ nullable: true })
  lightlevel?: number

  @Field({ nullable: true })
  lux?: number
}

@InterfaceType()
export abstract class DoorSensorState {
  @Field({ nullable: true })
  open?: boolean
}

@InterfaceType()
export abstract class HumiditySensorState {
  @Field({ nullable: true })
  humidity?: number
}

@InterfaceType()
export abstract class PressureSensorState {
  @Field({ nullable: true })
  pressure?: number
}

@InterfaceType()
export abstract class EnergyConsumptionSensorState {
  @Field({ nullable: true })
  consumption?: number
}

@InterfaceType()
export abstract class PowerSensorState {
  @Field({ nullable: true })
  current?: number

  @Field({ nullable: true })
  power?: number

  @Field({ nullable: true })
  voltage?: number
}

@ObjectType({
  implements: [
    DaylightSensorState,
    PresenceSensorState,
    TemperatureSensorState,
    LightSensorState,
    DoorSensorState,
    HumiditySensorState,
    PressureSensorState,
    EnergyConsumptionSensorState,
    PowerSensorState,
  ],
})
export class SensorState
  implements
    DaylightSensorState,
    PresenceSensorState,
    TemperatureSensorState,
    LightSensorState,
    DoorSensorState,
    HumiditySensorState,
    PressureSensorState,
    EnergyConsumptionSensorState,
    PowerSensorState {
  @Field()
  lastupdated: string

  dark?: boolean
  daylight?: boolean
  status?: number
  sunrise?: string
  sunset?: string
  presence?: boolean
  temperature?: number
  lightlevel?: number
  lux?: number
  open?: boolean
  humidity?: number
  pressure?: number
  consumption?: number
  current?: number
  power?: number
  voltage?: number
}
