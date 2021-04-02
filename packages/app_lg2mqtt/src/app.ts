import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import config from 'config'
import { TV } from './tv'

export function initApp(connected: { [key: string]: TV }) {
  const app = express()
  const devices = config.get<{
    [name: string]: string
  }>('devices')

  app.disable('x-powered-by')
  app.use(morgan('combined'))
  app.use((_: Request, res: Response, next: NextFunction) => {
    res.set('x-app', 'home-device-discovery-service')
    next()
  })
  app.use(express.json())

  // app.get('/devices/:name', (req: Request, res: Response) => {
  // })
}
