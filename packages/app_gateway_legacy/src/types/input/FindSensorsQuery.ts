import { InputType, Field } from 'type-graphql'
import { SensorType } from 'enums/SensorType'

@InputType()
export class FindSensorsQuery {
  @Field(() => String, { nullable: true })
  type: SensorType

  @Field({ nullable: true })
  room: string
}
