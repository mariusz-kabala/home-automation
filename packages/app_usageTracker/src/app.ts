import express, { Request, Response, NextFunction } from 'express'
import { turnOnPostValidation, turnOn, turnOff } from './routes/actions'
import { deviceHistory, searchHistory } from './routes/history'
import { deviceRules, rules, createRule, deleteRule } from './routes/rules'
import { deviceSkips, skips, createSkip, deleteSkip } from './routes/skips'
import morgan from 'morgan'

export function initApp() {
  const app = express()

  app.disable('x-powered-by')
  app.use(morgan('combined'))
  app.use((_: Request, res: Response, next: NextFunction) => {
    res.set('x-app', 'home-usage-tracker-service')
    next()
  })
  app.use(express.json())

  app.get('/managment/heath', (_: Request, res: Response) => {
    res.status(200).json({
      status: 'up',
    })
  })

  app.post('/turn/on', turnOnPostValidation, turnOn)
  app.get('/turn/on', turnOn)
  app.get('/turn/off', turnOff)
  app.get('/history/device', deviceHistory)
  app.get('/history/search', searchHistory)
  app.get('/rules/device', deviceRules)
  app.get('/rules', rules)
  app.post('/rules/create', createRule)
  app.delete('/rules/delete', deleteRule)
  app.get('/skips/device', deviceSkips)
  app.get('/skips', skips)
  app.post('/skips/create', createSkip)
  app.delete('/skips/delete', deleteSkip)

  app.all('*', (_: Request, res: Response) => {
    res.status(405).end()
  })

  return app
}
