import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import config from 'config'
import { Store } from '@home/commons'
import { logger } from '@home/logger'

export function initApp(store: Store) {
  const app = express()

  app.disable('x-powered-by')
  app.use(morgan('combined'))
  app.use((_: Request, res: Response, next: NextFunction) => {
    res.set('x-app', 'home-open-weather-service')
    next()
  })
  app.use(express.json())

  app.get('/cities/:city', (req: Request, res: Response) => {
    const { city } = req.params

    if (!store.has(city.toLocaleLowerCase())) {
      logger.log({
        level: 'error',
        message: `[HTTP] City ${city} is not supported. Not found returned`,
      })
      return res
        .status(404)
        .json({ status: 'not found' })
        .end()
    }

    res.status(200).json(store.get(city.toLocaleLowerCase()))
  })

  app.get('/cities', (_: Request, res: Response) => {
    res
      .status(200)
      .json(config.get<string[]>('cities'))
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
