import { InputType, Field } from 'type-graphql'

@InputType()
export class LightGroupParams {
  @Field()
  name: string

  @Field(() => [String])
  lights: string[]
}
