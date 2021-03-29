import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import config from 'config'
import { Store } from '@home/commons'
import { logger } from '@home/logger'
import { IDevice } from './types'

export function initApp(store: Store) {
  const app = express()
  const devices = config.get<IDevice[]>('devices')

  app.disable('x-powered-by')
  app.use(morgan('combined'))
  app.use((_: Request, res: Response, next: NextFunction) => {
    res.set('x-app', 'home-device-discovery-service')
    next()
  })
  app.use(express.json())

  app.get('/devices/:name', (req: Request, res: Response) => {
    const { name } = req.params

    if (!store.has(`devices.${name}`)) {
      logger.log({
        level: 'error',
        message: `[HTTP] Device ${name} not found`,
      })
      return res.status(404).end()
    }

    const device = devices.find(device => device.name === name) as IDevice

    res
      .status(200)
      .json({
        name: device.name,
        address: device.address,
        mac: device.mac,
        port: device.port,
        status: store.get(`devices.${device.name}`),
      })
      .end()
  })

  app.get('/devices', (req: Request, res: Response) => {
    const { online, offline } = req.query
    let result = devices.map(device => ({
      name: device.name,
      address: device.address,
      mac: device.mac,
      port: device.port,
      status: store.get(`devices.${device.name}`),
    }))

    if (online) {
      result = result.filter(device => device.status)
    } else if (offline) {
      result = result.filter(device => !device.status)
    }

    res
      .status(200)
      .json(result)
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
