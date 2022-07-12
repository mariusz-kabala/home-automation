import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class AqicnorgTime {
  @Field()
  s: string

  @Field()
  tz: string

  @Field()
  v: number

  @Field()
  iso: string
}
