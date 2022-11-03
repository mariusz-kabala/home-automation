import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Fav {
  @Field()
  name: string

  @Field()
  pos: number
}
