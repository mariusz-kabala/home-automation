/* eslint-disable no-console */
import 'reflect-metadata'
import express from 'express'
import { Container } from 'typedi'
import depthLimit from 'graphql-depth-limit'
import { buildSchema } from 'type-graphql'
import compression from 'compression'
import cors from 'cors'
import { registerInConsul } from '@home/commons'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'

import { LightResolver } from 'resolvers/Light'
import { LightsGroupResolver } from 'resolvers/LightsGroup'
import { SensorResolver } from 'resolvers/Sensor'

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [LightResolver, LightsGroupResolver, SensorResolver],
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
  server.applyMiddleware({ app, path: '/' })

  const httpServer = createServer(app)
  httpServer.listen({ port: 3000 }, (): void => console.log(`\n🚀      Gateway is now running`))

  registerInConsul('gateway')
}

bootstrap()
