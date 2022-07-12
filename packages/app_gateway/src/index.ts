import 'reflect-metadata'

import express from 'express'
import { Container } from 'typedi'
import depthLimit from 'graphql-depth-limit'
import { buildSchema } from 'type-graphql'
import compression from 'compression'
import cors from 'cors'
import config from 'config'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [],
    container: Container,
  })

  const app = express()
  const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)],
    playground: true,
  })

  app.use(cors())
  app.use(compression())
  server.applyMiddleware({ app, path: '/graphql' })

  const httpServer = createServer(app)
  // eslint-disable-next-line no-console
  httpServer.listen({ port: 3000 }, (): void => console.log(`\n🚀      Gateway is now running`))
}

bootstrap()
