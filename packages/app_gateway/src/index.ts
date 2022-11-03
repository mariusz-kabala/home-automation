import 'reflect-metadata'

import express from 'express'
import { Container } from 'typedi'
import depthLimit from 'graphql-depth-limit'
import { buildSchema } from 'type-graphql'
import compression from 'compression'
import cors from 'cors'
import { mongoose } from '@home/mongoose-client'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { createServer } from 'http'

import { DashboardResolver } from 'resolvers/Dashboard'
import { ShellyResolver } from 'resolvers/Shelly'

async function bootstrap() {
  mongoose.connection.once('open', () => {
    // eslint-disable-next-line no-console
    console.log('Database connection established')
  })
  const schema = await buildSchema({
    resolvers: [DashboardResolver, ShellyResolver],
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
