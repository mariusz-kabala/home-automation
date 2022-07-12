import { DocumentType, getModelForClass, prop as Property } from '@typegoose/typegoose'
import { Field as GqlField, ObjectType as GqlType } from 'type-graphql'

@GqlType()
export class DashboardScreen {
  @GqlField(() => String)
  readonly _id: string

  @GqlField(() => String)
  @Property({ required: true })
  name: string

  @GqlField(() => String)
  @Property({ required: true })
  icon: string

  @GqlField(() => String)
  @Property({ required: true })
  section: string

  @GqlField(() => String)
  @Property({ required: true })
  setup: string
}
