export interface IGroup {
  action: {
    bri?: number
    ct?: number
    effect?: 'none' | 'colorloop'
    hue?: number // (0..65535)
    on?: boolean
    sat?: number // (0..255)
    xy?: number[]
  }
  devicemembership: string[] // A list of device ids (sensors) if this group was created by a device.
  etag: string // HTTP etag which changes on any action to the group.
  id: string // The id of the group.
  lights: string[] // A list of all light ids of this group. Sequence is defined by the gateway.
  name: string // Name of the group.
  scenes: string[] // A list of scenes of the group.
}

export interface ISensor {
  config: {
    on: boolean // The on/off status of the sensor.
    reachable: boolean // The reachable status of the sensor.
    battery: number // (1..100) The current battery state in percent, only for battery powered devices.
  }
  ep: number // The Endpoint of the sensor.
  etag: string // HTTP etag which changes whenever the sensor changes.
  manufacturername: string // The manufacturer name of the sensor.
  modelid: string // The model id of the sensor.
  mode?: 1 | 2 | 3 // The mode of the sensor (Only available for dresden elektroink Lighting Switch).
  name: string // The name of the sensor.
  state: {
    lastupdated: string
    buttonevent?: number
    presence?: boolean
    dark?: boolean
    daylight?: boolean
    lightlevel?: number
    lux?: number
    // todo: more is missing (temperature, humidity, pressure etc)
  }
  type: string // The type of the sensor.
  uniqueid: string // The unique identifiers (MAC address) of the sensor.
}

export interface ILight {
  ctmax: number
  ctmin: number
  etag: string
  hascolor: boolean
  manufacturername: string
  modelid: string
  name: string
  state: {
    [key: string]: number | string | boolean | number[]
  }
  swversion: string
  type: string
  uniqueid: string
}
