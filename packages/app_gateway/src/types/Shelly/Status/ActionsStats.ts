import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class ActionsStats {
  @Field()
  skipped: number
}
