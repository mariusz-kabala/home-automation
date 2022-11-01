import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class BuildInfo {
  @Field()
  build_id: string

  @Field()
  build_timestamp: string

  @Field()
  build_version: string
}
