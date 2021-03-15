import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import { Store } from '@home/commons'
import { logger } from '@home/logger'

export function initApp(store: Store) {
  const app = express()

  app.disable('x-powered-by')
  app.use(morgan('combined'))
  app.use((_: Request, res: Response, next: NextFunction) => {
    res.set('x-app', 'home-pollution-reports-service')
    next()
  })
  app.use(express.json())

  app.get('/city/:city', (req: Request, res: Response) => {
    const { city } = req.params

    if (!store.has(city)) {
      logger.log({
        level: 'error',
        message: `[HTTP] City ${city} is not supported. Not found returned`,
      })
      return res
        .status(404)
        .json({ status: 'not found' })
        .end()
    }

    res.status(200).json(store.get(city))
  })

  app.get('/provider/:provider', (req: Request, res: Response) => {
    const { provider } = req.params

    if (!store.has(provider)) {
      logger.log({
        level: 'error',
        message: `[HTTP] Provider ${provider} is not supported. Not found returned`,
      })
      return res
        .status(404)
        .json({ status: 'not found' })
        .end()
    }

    res.status(200).json(store.get(provider))
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
