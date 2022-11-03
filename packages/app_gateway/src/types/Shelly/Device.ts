import { ObjectType, Field } from 'type-graphql'
import { Network } from './Network'
import { Usage } from './Usage'
import { Settings } from './Settings'
import { Status } from './Status'
@ObjectType()
export class ShellyDevice {
  @Field()
  label: string

  @Field({ nullable: true })
  hostname: string

  @Field()
  name: string

  @Field()
  type: string

  @Field()
  macAddress: string

  @Field()
  deviceId: string

  @Field(() => [Network])
  networks: Network[]

  @Field(() => Usage, { nullable: true })
  usage: Usage

  @Field()
  category: string

  @Field()
  room: string

  @Field()
  level: number

  @Field()
  mqttStatus: string

  @Field()
  httpStatus: string

  @Field(() => Status)
  status: Status

  @Field(() => Settings)
  settings: Settings
}
