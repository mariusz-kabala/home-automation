import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class SettingsWifiSTA {
  @Field()
  enabled: boolean

  @Field()
  ssid: string

  @Field()
  ipv4_method: string

  @Field()
  ip: string

  @Field()
  gw: string

  @Field()
  mask: string

  @Field()
  dns: string
}
