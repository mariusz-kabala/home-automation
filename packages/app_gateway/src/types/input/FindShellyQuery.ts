import { InputType, Field } from 'type-graphql'
import { ConnectionStatus, ShellyCategory, ShellyType, Room } from '@home/models'

@InputType()
export class FindSensorsQuery {
  @Field(() => String, { nullable: true })
  level: string

  @Field(() => String, { nullable: true })
  category: ShellyCategory

  @Field(() => String, { nullable: true })
  room: Room

  @Field(() => String, { nullable: true })
  type: ShellyType

  @Field(() => String, { nullable: true })
  mqttStatus: ConnectionStatus

  @Field(() => String, { nullable: true })
  httpStatus: ConnectionStatus
}
