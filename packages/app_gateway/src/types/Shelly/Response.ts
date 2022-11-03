import { ObjectType, Field } from 'type-graphql'
import { ShellyDevice } from './Device'

@ObjectType()
export class ShellyResponse {
  @Field(() => [ShellyDevice])
  docs: ShellyDevice[]

  @Field()
  total: number

  @Field()
  limit: number

  @Field()
  offset: number
}
