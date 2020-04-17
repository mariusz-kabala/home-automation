import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { logger } from '@home/logger'
import mongoose from '@home/mongoose-client'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { redisClient } from '@home/redis'
import cookieParser from 'cookie-parser'
import config from 'config'

import { initPassport } from './controllers/passport'
import { initJWT } from './controllers/jwt'

const app = express()
const isProduction = app.get('env') === 'production'

const RedisStore = connectRedis(session)
const sessionConfiguration: session.SessionOptions = {
  store: new RedisStore({ client: redisClient }),
  secret: config.get<string>('sessionSecret'),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction,
  },
}

if (isProduction) {
  app.set('trust proxy', 1)
}

mongoose.connection.on('error', err => {
  logger.error(`${err}`)
  process.exit(1)
})

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(cookieParser(config.get<string>('sessionSecret')))
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use(session(sessionConfiguration) as any)

initPassport(app)
initJWT(app)

app.get('/managment/heath', (_: Request, res: Response) => {
  res.status(200).json({
    status: 'up',
  })
})

app.all('*', (_: Request, res: Response) => {
  res.status(404).json({ status: 'not found' })
})

export { app }
