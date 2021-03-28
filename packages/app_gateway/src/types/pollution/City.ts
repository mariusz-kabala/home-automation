import { ObjectType, Field } from 'type-graphql'
import { AqicnorgProvider } from './AqicnorgProvider'
import { AirvisualProvider } from './AirvisualProvider'

@ObjectType()
export class City {
  @Field(() => AirvisualProvider)
  airvisual: AirvisualProvider

  @Field(() => AqicnorgProvider)
  aqicnorg: AqicnorgProvider
}
