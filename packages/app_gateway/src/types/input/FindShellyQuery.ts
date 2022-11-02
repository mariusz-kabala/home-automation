import { InputType, Field } from 'type-graphql'
import { ConnectionStatus, ShellyCategory, ShellyType, Room } from '@home/models'

@InputType()
export class FindSensorsQuery {
  @Field(() => String, { nullable: true })
  level: string

  @Field(() => ShellyCategory, { nullable: true })
  category: ShellyCategory

  @Field(() => Room, { nullable: true })
  room: Room

  @Field(() => ShellyType, { nullable: true })
  type: ShellyType

  @Field(() => ConnectionStatus, { nullable: true })
  mqttStatus: ConnectionStatus

  @Field(() => ConnectionStatus, { nullable: true })
  httpStatus: ConnectionStatus
}
