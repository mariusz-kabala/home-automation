import 'graphql-import-node'
import typeDefs from './schema/schema.graphql'

import { makeExecutableSchema } from 'apollo-server-express'
import { resolverMap } from './resolverMap'

import { GraphQLSchema } from 'graphql'

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers: resolverMap,
})

export default schema
