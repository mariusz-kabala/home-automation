import { ObjectType, Field } from 'type-graphql'
import { Device } from './Device'
import { WifiAP } from './WifiAp'
import { WifiSTA } from './WifiSta'
import { ApRoaming } from './ApRoaming'
import { Mqtt } from './Mqtt'
import { Coiot } from './Coiot'
import { Sntp } from './Sntp'
import { Login } from './Login'
import { BuildInfo } from './BuildInfo'
import { Cloud } from './Cloud'
import { Actions } from './Actions'
import { Hwinfo } from './Hwinfo'
import { Relay } from './Relay'
import { Roller } from './Roller'
import { Fav } from './Fav'

@ObjectType()
export class Settings {
  @Field(() => Device)
  device: Device

  @Field(() => WifiAP)
  wifi_ap: WifiAP

  @Field(() => WifiSTA)
  wifi_sta: WifiSTA

  @Field(() => WifiSTA)
  wifi_sta1: WifiSTA

  @Field(() => ApRoaming)
  ap_roaming: ApRoaming

  @Field(() => Mqtt)
  mqtt: Mqtt

  @Field(() => Coiot)
  coiot: Coiot

  @Field(() => Sntp)
  sntp: Sntp

  @Field(() => Login)
  login: Login

  @Field()
  pin_code: string

  @Field()
  name: string

  @Field()
  fw: string

  @Field()
  factory_reset_from_switch: boolean

  @Field()
  discoverable: boolean

  @Field(() => BuildInfo)
  build_info: BuildInfo

  @Field(() => Cloud)
  cloud: Cloud

  @Field()
  timezone: string

  @Field()
  lat: number

  @Field()
  lng: number

  @Field()
  tzautodetect: boolean

  @Field()
  tz_utc_offset: number

  @Field()
  tz_dst: boolean

  @Field()
  tz_dst_auto: boolean

  @Field()
  time: string

  @Field()
  unixtime: number

  @Field()
  led_status_disable: boolean

  @Field()
  debug_enable: boolean

  @Field()
  allow_cross_origin: boolean

  @Field(() => Actions)
  actions: Actions

  @Field(() => Hwinfo)
  hwinfo: Hwinfo

  @Field()
  mode: string

  @Field()
  max_power: number

  @Field()
  longpush_time: number

  @Field(() => [Relay])
  relays: Relay[]

  @Field(() => [Roller])
  rollers: Roller[]

  @Field()
  favorites_enabled: boolean

  @Field(() => [Fav])
  favorites: Fav[]

  @Field()
  eco_mode_enabled: boolean
}
