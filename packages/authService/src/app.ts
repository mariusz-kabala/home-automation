import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { logger } from '@home/logger'
import mongoose from '@home/mongoose-client'

import { initPassport } from './helpers/passport'

const app = express()

mongoose.connection.on('error', err => {
  logger.error(`${err}`)
  process.exit(1)
})

app.disable('x-powered-by')
app.use(bodyParser.json())

initPassport(app)

app.get('/managment/heath', (_: Request, res: Response) => {
  res.status(200).json({
    status: 'up',
  })
})

app.all('*', (_: Request, res: Response) => {
  res.status(404).json({ status: 'not found' })
})

export { app }
