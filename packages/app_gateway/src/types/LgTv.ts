import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class LgTv {
  @Field()
  name: string

  @Field()
  on: boolean

  @Field()
  volume?: number

  @Field()
  muted?: boolean

  @Field()
  app?: string

  @Field()
  channel?: number
}
