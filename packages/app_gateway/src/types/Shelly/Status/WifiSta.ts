import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class WifiSta {
  @Field()
  connected: boolean

  @Field()
  ssid: string

  @Field()
  ip: string

  @Field()
  rssi: number
}
