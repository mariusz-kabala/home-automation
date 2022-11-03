import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class MqttSettings {
  @Field()
  enable: boolean

  @Field()
  server: string

  @Field()
  user: string

  @Field()
  id: string

  @Field()
  reconnect_timeout_max: number

  @Field()
  reconnect_timeout_min: number

  @Field()
  clean_session: boolean

  @Field()
  keep_alive: number

  @Field()
  max_qos: number

  @Field()
  retain: boolean

  @Field()
  update_period: number
}
