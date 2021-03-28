/* eslint-disable no-console */
import 'reflect-metadata'
import express from 'express'
import { Container } from 'typedi'
import depthLimit from 'graphql-depth-limit'
import { buildSchema } from 'type-graphql'
import compression from 'compression'
import cors from 'cors'
import config from 'config'
import { registerInConsul, ConsulServices } from '@home/commons'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'

import { LightResolver } from 'resolvers/Light'
import { LightsGroupResolver } from 'resolvers/LightsGroup'
import { SensorResolver } from 'resolvers/Sensor'
import { PollutionResolver } from 'resolvers/Pollution'

async function bootstrap() {
  const consulServices = new ConsulServices(config.get<string[]>('consulServices'))

  Container.set({ id: 'consulServices', factory: () => consulServices })

  const schema = await buildSchema({
    resolvers: [LightResolver, LightsGroupResolver, SensorResolver, PollutionResolver],
    container: Container,
  })

  const app = express()
  const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)],
    playground: true,
  })
  app.use('*', cors())
  app.use(compression())
  server.applyMiddleware({ app, path: '/graphql' })

  const httpServer = createServer(app)
  httpServer.listen({ port: 3000 }, (): void => console.log(`\n🚀      Gateway is now running`))

  registerInConsul('gateway')
}

bootstrap()
