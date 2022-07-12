import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class LgTv {
  @Field()
  name: string

  @Field()
  on: boolean

  @Field({ nullable: true })
  volume?: number

  @Field({ nullable: true })
  muted?: boolean

  @Field({ nullable: true })
  app?: string

  @Field({ nullable: true })
  channel?: number
}
