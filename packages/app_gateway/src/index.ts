import 'reflect-metadata'

import express from 'express'
import { Container } from 'typedi'
import depthLimit from 'graphql-depth-limit'
import { buildSchema } from 'type-graphql'
import compression from 'compression'
import cors from 'cors'
import config from 'config'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { createServer } from 'http'

import { DashboardResolver } from 'resolvers/Dashboard'

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [DashboardResolver],
    container: Container,
  })

  const app = express()
  const httpServer = createServer(app)

  const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)],
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginLandingPageGraphQLPlayground()],
  })

  await server.start()

  app.use(cors())
  app.use(compression())
  server.applyMiddleware({ app, path: '/graphql' })

  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve))
  // eslint-disable-next-line no-console
  console.log(`\n🚀      Gateway is now running`)
}

bootstrap()
