import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class WifiAP {
  @Field()
  enabled: boolean

  @Field()
  ssid: string

  @Field()
  key: string
}
