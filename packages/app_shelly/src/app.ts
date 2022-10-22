import express, { Request, Response, NextFunction } from 'express'
import { logger } from '@home/logger'
import { mongoose } from '@home/mongoose-client'
import morgan from 'morgan'
import { find, show, actions, update } from './routes'
import { start as mqttStart } from './mqttClient'

const app = express()

mongoose.connection.on('error', err => {
  logger.error(`${err}`)
  process.exit(1)
})

mongoose.connection.on('open', mqttStart)

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

app.get('/', find.list)
app.get('/search', find.find)
app.get('/rooms/:room', find.room)
app.get('/categories/:category', find.category)
app.get('/types/:type', find.type)
app.get('/devices/:id/relay/:relay', actions.turn)
app.get('/devices/:id/roller/:roller')
app.get('/devices/:id', show.details)
app.get('/update/all', update.updateAll)
app.get('/update/:id', update.updateOne)

app.all('*', (_: Request, res: Response) => {
  res.status(404).json({ status: 'not found' })
})

export { app }
