import { InputType, Field } from 'type-graphql'

@InputType()
export class LightParams {
  @Field()
  name: string
}
