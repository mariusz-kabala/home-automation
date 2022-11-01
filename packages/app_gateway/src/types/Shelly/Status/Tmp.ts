import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Tmp {
  @Field()
  tC: number

  @Field()
  tF: string

  @Field()
  is_valid: boolean
}
