/* eslint-disable @typescript-eslint/no-unused-vars */
import { GraphQLResolveInfo } from 'graphql'
import { IResolvers } from 'graphql-tools'

import { Context } from './models'

export const resolverMap: IResolvers = {
  Query: {
    deCONZLight(_source: void, { id }: { id: string }, { dataSources }: Context, _info: GraphQLResolveInfo) {
      return dataSources.deCONZLights.getLight(id)
    },
    deCONZLights(_: void, _args: void, { dataSources }: Context, _info: GraphQLResolveInfo) {
      return dataSources.deCONZLights.getLights()
    },
    deCONZGroup(_source: void, { id }: { id: string }, { dataSources }: Context, _info: GraphQLResolveInfo) {
      return dataSources.deCONZGroups.getGroup(id)
    },
    deCONZGroups(_: void, _args: void, { dataSources }: Context, _info: GraphQLResolveInfo) {
      return dataSources.deCONZGroups.getGroups()
    },
  },
  Mutation: {
    updateDeCONZGroupState(
      _source: void,
      { input }: { input: any },
      { dataSources }: Context,
      _info: GraphQLResolveInfo,
    ) {
      const { id } = input

      return dataSources.deCONZGroups.updateGroupState(id, input)
    },
  },
  DeCONZGroup: {
    state(parent) {
      return parent.action
    },
    lights(parent, _args: void, { dataSources }: Context) {
      const { lights } = parent

      return dataSources.deCONZLights.getLights().then((results: any) => {
        return Object.keys(results)
          .filter(lightId => lights.includes(lightId))
          .map(lightId => ({
            id: lightId,
            ...results[lightId],
          }))
      })
    },
  },
}
