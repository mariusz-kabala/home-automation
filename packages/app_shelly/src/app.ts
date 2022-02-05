import express, { Request, Response, NextFunction } from 'express'
import { logger } from '@home/logger'
import { mongoose } from '@home/mongoose-client'
import morgan from 'morgan'

const app = express()

mongoose.connection.on('error', err => {
  logger.error(`${err}`)
  process.exit(1)
})

app.disable('x-powered-by')
app.use(morgan('combined'))
app.use((_: Request, res: Response, next: NextFunction) => {
  res.set('x-app', 'home-shelly-service')
  next()
})

app.use(express.json())

app.get('/managment/heath', (_: Request, res: Response) => {
  res.status(200).json({
    status: 'up',
  })
})

app.all('*', (_: Request, res: Response) => {
  res.status(404).json({ status: 'not found' })
})

export { app }
