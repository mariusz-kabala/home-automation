import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import { Store } from '@home/commons'
import { logger } from '@home/logger'

export function initApp(store: Store) {
  const app = express()

  app.disable('x-powered-by')
  app.use(morgan('combined'))
  app.use((_: Request, res: Response, next: NextFunction) => {
    res.set('x-app', 'home-device-discovery-service')
    next()
  })
  app.use(express.json())

  app.get('/devices', (_: Request, res: Response) => {
    res
      .status(200)
      .json(store.get('devices'))
      .end()
  })

  app.get('/devices/:name', (req: Request, res: Response) => {
    const { name } = req.params

    if (!store.has(`devices.${name}`)) {
      logger.log({
        level: 'error',
        message: `[HTTP] Device ${name} not found`,
      })
      return res.status(404).end()
    }

    res
      .status(200)
      .json(store.get('devices'))
      .end()
  })

  app.get('/managment/heath', (_: Request, res: Response) => {
    res.status(200).json({
      status: 'up',
    })
  })

  app.all('*', (_: Request, res: Response) => {
    res.status(404).json({ status: 'not found' })
  })

  return app
}
