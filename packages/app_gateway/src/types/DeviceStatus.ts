import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class DeviceStatus {
  @Field()
  name: string

  @Field()
  address: string

  @Field()
  status: boolean

  @Field()
  port?: number

  @Field()
  mac?: string
}
