import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Actions {
  @Field()
  active: boolean

  @Field(() => [String])
  names: string[]
}
