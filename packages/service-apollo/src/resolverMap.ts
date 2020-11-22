/* eslint-disable @typescript-eslint/no-unused-vars */
import { GraphQLResolveInfo } from 'graphql'
import { IResolvers } from 'graphql-tools'

import { Context } from './models'

export const resolverMap: IResolvers = {
  Query: {
    light(_source: void, { id }: { id: string }, { dataSources }: Context, _info: GraphQLResolveInfo) {
      return dataSources.deCONZLights.getLight(id)
    },
    lights(_: void, _args: void, { dataSources }: Context, _info: GraphQLResolveInfo) {
      return dataSources.deCONZLights.getLights()
    },
  },
}
