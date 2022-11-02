import { ObjectType, Field } from 'type-graphql'
import { ShellyDevice } from './Device'

@ObjectType()
export class Response {
  @Field(() => [ShellyDevice])
  docs: ShellyDevice[]

  @Field()
  total: number

  @Field()
  limit: number

  @Field()
  offset: number
}
