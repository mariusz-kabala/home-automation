import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Hwinfo {
  @Field()
  hw_revision: string

  @Field()
  batch_id: number
}
