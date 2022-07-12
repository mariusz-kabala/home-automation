import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'
import { ObjectId } from 'mongodb'

@ObjectType()
export class DashboardScreen {
  @Field(() => String)
  readonly _id: ObjectId

  @Field(() => String)
  @Property({ required: true })
  name: string

  @Field(() => String)
  @Property({ required: true })
  icon: string

  @Field(() => String)
  @Property({ required: true })
  section: string

  @Field(() => String)
  @Property({ required: true })
  setup: string
}

export const DashboardScreenModel = getModelForClass(DashboardScreen)
