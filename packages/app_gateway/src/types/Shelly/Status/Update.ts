import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Update {
  @Field()
  status: string

  @Field()
  has_update: boolean

  @Field()
  new_version: string

  @Field()
  old_version: string
}
