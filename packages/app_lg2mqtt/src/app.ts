import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import config from 'config'
import { logger } from '@home/logger'
import { TV, ITvState } from './tv'

export function initApp(connected: { [key: string]: TV }) {
  const app = express()
  const tvApps = config.get<{
    [key: string]: string
  }>('apps')
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

  app.put('/tv/:name/lunchApp', (req: Request, res: Response) => {
    const { app } = req.body
    const { name } = req.params

    if (!devices[name]) {
      logger.log({
        level: 'error',
        message: `Device ${name} not found, can not lunch the application ${app}`,
        device: name,
      })
      return res.status(404).end()
    }

    if (!connected[name]) {
      logger.log({
        level: 'error',
        message: `Device ${name} not connected, can not lunch the application ${app}`,
        device: name,
      })
      return res.status(403).end()
    }

    if (!tvApps[app]) {
      logger.log({
        level: 'error',
        message: `Invalid app ${app} was tired to exected on device ${name}`,
        device: name,
      })
      return res.status(400).end()
    }

    connected[name].runCommand({ app }, 'lunchApp')

    logger.log({
      level: 'success',
      message: `App ${app} has been lunched on device ${name}`,
      device: name,
    })

    return res.status(200).end()
  })

  app.put('/tv/:name/notification', (req: Request, res: Response) => {
    const { message } = req.body
    const { name } = req.params

    if (!devices[name]) {
      logger.log({
        level: 'error',
        message: `Device ${name} not found, can not send notification ${message}`,
        device: name,
      })
      return res.status(404).end()
    }

    if (!connected[name]) {
      logger.log({
        level: 'error',
        message: `Device ${name} not connected, can not send notification ${message}`,
        device: name,
      })
      return res.status(403).end()
    }

    connected[name].runCommand({ message }, 'sendNotification')

    logger.log({
      level: 'success',
      message: `notification ${message} has been sent to device ${name}`,
      device: name,
    })

    return res.status(200).end()
  })

  app.put('/tv/:name/setMute', (req: Request, res: Response) => {
    const { name } = req.params
    const { mute } = req.body

    if (!devices[name]) {
      logger.log({
        level: 'error',
        message: `Device ${name} not found, can not set mute to ${JSON.stringify(mute)}`,
        device: name,
      })
      return res.status(404).end()
    }

    if (!connected[name]) {
      logger.log({
        level: 'error',
        message: `Device ${name} not connected, can not set mute to ${JSON.stringify(mute)}`,
        device: name,
      })
      return res.status(403).end()
    }

    connected[name].runCommand({ mute }, 'setMute')

    logger.log({
      level: 'success',
      message: `Mute has been set to ${JSON.stringify(mute)} on device ${name}`,
      device: name,
    })

    return res.status(200).end()
  })

  app.put('/tv/:name/setVolume', (req: Request, res: Response) => {
    const { name } = req.params
    const { volume } = req.body

    if (!devices[name]) {
      logger.log({
        level: 'error',
        message: `Device ${name} not found, can not set volume to ${JSON.stringify(volume)}`,
        device: name,
      })
      return res.status(404).end()
    }

    if (!connected[name]) {
      logger.log({
        level: 'error',
        message: `Device ${name} not connected, can not set volume to ${JSON.stringify(volume)}`,
        device: name,
      })
      return res.status(403).end()
    }

    connected[name].runCommand({ volume }, 'setVolume')

    logger.log({
      level: 'success',
      message: `Volume has been set to ${JSON.stringify(volume)} on device ${name}`,
      device: name,
    })

    return res.status(200).end()
  })

  app.post('/tv/:name/volumeUp', (req: Request, res: Response) => {
    const { name } = req.params

    if (!devices[name]) {
      logger.log({
        level: 'error',
        message: `Device ${name} not found, can not set volume up`,
        device: name,
      })
      return res.status(404).end()
    }

    if (!connected[name]) {
      logger.log({
        level: 'error',
        message: `Device ${name} not connected, can not set volume up`,
        device: name,
      })
      return res.status(403).end()
    }

    connected[name].runCommand(null, 'volumeUp')

    logger.log({
      level: 'success',
      message: `Volume has been set up on device ${name}`,
      device: name,
    })

    return res.status(200).end()
  })

  app.post('/tv/:name/volumeDown', (req: Request, res: Response) => {
    const { name } = req.params

    if (!devices[name]) {
      logger.log({
        level: 'error',
        message: `Device ${name} not found, can not set volume down`,
        device: name,
      })
      return res.status(404).end()
    }

    if (!connected[name]) {
      logger.log({
        level: 'error',
        message: `Device ${name} not connected, can not set volume down`,
        device: name,
      })
      return res.status(403).end()
    }

    connected[name].runCommand(null, 'volumeDown')

    logger.log({
      level: 'success',
      message: `Volume has been set down on device ${name}`,
      device: name,
    })

    return res.status(200).end()
  })

  app.post('/tv/:name/play', (req: Request, res: Response) => {
    const { name } = req.params

    if (!devices[name]) {
      logger.log({
        level: 'error',
        message: `Device ${name} not found, can not run play command`,
        device: name,
      })
      return res.status(404).end()
    }

    if (!connected[name]) {
      logger.log({
        level: 'error',
        message: `Device ${name} not connected, can not run play command`,
        device: name,
      })
      return res.status(403).end()
    }

    connected[name].runCommand(null, 'play')

    logger.log({
      level: 'success',
      message: `Command play successfully run on device ${name}`,
      device: name,
    })

    return res.status(200).end()
  })

  app.post('/tv/:name/pause', (req: Request, res: Response) => {
    const { name } = req.params

    if (!devices[name]) {
      logger.log({
        level: 'error',
        message: `Device ${name} not found, can not run pause command`,
        device: name,
      })
      return res.status(404).end()
    }

    if (!connected[name]) {
      logger.log({
        level: 'error',
        message: `Device ${name} not connected, can not run pause command`,
        device: name,
      })
      return res.status(403).end()
    }

    connected[name].runCommand(null, 'pause')

    logger.log({
      level: 'success',
      message: `Command pause successfully run on device ${name}`,
      device: name,
    })

    return res.status(200).end()
  })

  app.get('/tv/:name', (req: Request, res: Response) => {
    const { name } = req.params

    if (!devices[name]) {
      logger.log({
        level: 'error',
        message: `Device ${name} not found, can not return the status`,
        device: name,
      })
      return res.status(404).end()
    }

    if (!connected[name]) {
      return res.status(200).json({
        on: false,
      })
    }

    return res.status(200).json(connected[name].state.dump())
  })

  app.get('/tvs', (_: Request, res: Response) => {
    return res.status(200).json(
      Object.keys(devices).reduce<{ [tv: string]: Partial<ITvState> }>((all, tv) => {
        if (connected[tv]) {
          all[tv] = connected[tv].state.dump()
        } else {
          all[tv] = {
            on: false,
          }
        }

        return all
      }, {}),
    )
  })

  return app
}
