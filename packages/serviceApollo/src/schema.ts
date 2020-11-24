import 'graphql-import-node'
import queryDefs from './schema/schema.graphql'
import deCONZGroupDefs from './schema/deCONZGroup.graphql'
import deCONZLightDefs from './schema/deCONZLight.graphql'

import { makeExecutableSchema } from 'apollo-server-express'
import { resolverMap } from './resolverMap'

import { GraphQLSchema } from 'graphql'

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [deCONZLightDefs, deCONZGroupDefs, queryDefs],
  resolvers: resolverMap,
})

export default schema
