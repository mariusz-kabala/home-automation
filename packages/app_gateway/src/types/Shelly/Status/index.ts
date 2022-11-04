import { ObjectType, Field } from 'type-graphql'
import { WifiSta } from './WifiSta'
import { Cloud } from './Cloud'
import { Mqtt } from './Mqtt'
import { ActionsStats } from './ActionsStats'
import { Relay } from './Relay'
import { Roller } from './Roller'
import { Meter } from './Meter'
import { Input } from './Input'
import { Tmp } from './Tmp'
import { Update } from './Update'

@ObjectType()
export class Status {
  @Field(() => WifiSta)
  wifi_sta: WifiSta

  @Field(() => Cloud)
  cloud: Cloud

  @Field(() => Mqtt)
  mqtt: Mqtt

  @Field()
  old_version: string

  @Field()
  time: string

  @Field()
  unixtime: number

  @Field()
  serial: number

  @Field()
  has_update: boolean

  @Field()
  mac: string

  @Field()
  cfg_changed_cnt: number

  @Field(() => ActionsStats)
  actions_stats: ActionsStats

  @Field(() => [Relay], { nullable: true })
  relays: Relay[]

  @Field(() => [Roller], { nullable: true })
  rollers: Roller[]

  @Field(() => [Meter])
  meters: Meter[]

  @Field(() => [Input])
  inputs: Input[]

  @Field()
  temperature: number

  @Field()
  overtemperature: boolean

  @Field(() => Tmp)
  tmp: Tmp

  @Field()
  temperature_status: string

  @Field(() => Update)
  update: Update

  @Field()
  ram_total: number

  @Field()
  ram_free: number

  @Field()
  fs_size: number

  @Field()
  fs_free: number

  @Field()
  voltage: number

  @Field()
  uptime: number
}
