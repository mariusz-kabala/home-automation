import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class SettingsWifiAP {
  @Field()
  enabled: boolean

  @Field()
  ssid: string

  @Field()
  key: string
}
