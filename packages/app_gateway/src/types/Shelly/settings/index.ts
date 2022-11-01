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
  device: Device

  wifi_ap: WifiAP
  wifi_sta: WifiSTA
  wifi_sta1: WifiSTA
  ap_roaming: ApRoaming
  mqtt: Mqtt
  coiot: Coiot
  sntp: Sntp
  login: Login
  pin_code: string
  name: string
  fw: string
  factory_reset_from_switch: boolean
  discoverable: boolean
  build_info: BuildInfo
  cloud: Cloud
  timezone: string
  lat: number
  lng: number
  tzautodetect: boolean
  tz_utc_offset: number
  tz_dst: boolean
  tz_dst_auto: boolean
  time: string
  unixtime: number
  led_status_disable: boolean
  debug_enable: boolean
  allow_cross_origin: boolean
  actions: Actions
  hwinfo: Hwinfo
  mode: string
  max_power: number
  longpush_time: number
  relays: Relay[]
  rollers: Roller
  favorites_enabled: boolean
  favorites: Fav[]
  eco_mode_enabled: boolean
}
