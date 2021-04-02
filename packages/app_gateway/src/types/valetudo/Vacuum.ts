import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Vacuum {
  @Field()
  status: string

  @Field()
  batteryLevel: number

  @Field()
  batteryStatus: string

  @Field()
  fanSpeed: string

  @Field()
  mainBrushRemainingUsageTime: number

  @Field()
  rightBrushRemainingUsageTime: number

  @Field()
  mainFilterRemainingUsageTime: number

  @Field()
  sensorRemainingUsageTime: number
}
