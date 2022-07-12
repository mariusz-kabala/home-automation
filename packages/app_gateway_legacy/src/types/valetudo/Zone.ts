import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class VacuumZone {
  @Field()
  name: string

  @Field()
  id: string

  @Field(() => [[Number]])
  areas: number[][]
}
