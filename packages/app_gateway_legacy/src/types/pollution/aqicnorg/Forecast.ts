import { ObjectType, Field } from 'type-graphql'

@ObjectType()
class AqicnorgForecastValue {
  @Field()
  avg: number

  @Field()
  day: string

  @Field()
  max: number

  @Field()
  min: number
}

@ObjectType()
export class AqicnorgForecast {
  @Field(() => [AqicnorgForecastValue])
  o3: AqicnorgForecastValue[]

  @Field(() => [AqicnorgForecastValue])
  pm10: AqicnorgForecastValue[]

  @Field(() => [AqicnorgForecastValue])
  pm25: AqicnorgForecastValue[]

  @Field(() => [AqicnorgForecastValue])
  uvi: AqicnorgForecastValue[]
}
