import { subscribe, publish } from '@home/mqtt'
import { logger } from '@home/logger'
// eslint-disable-next-line import/default
import isReachable from 'is-reachable'
import config from 'config'

import { enableWarming, brewOn, brewOff } from './coffeeMachine'

function init() {
  subscribe('smarterCoffeeMachine/enableWarming', (msg: { time: number }) => {
    enableWarming(msg.time)
  })

  subscribe('smarterCoffeeMachine/brewOn', (msg: { useGrind: number; cups: number; strength: number }) => {
    const { useGrind = 1, cups = 5, strength = 2 } = msg

    brewOn(useGrind, cups, strength)
  })

  subscribe('smarterCoffeeMachine/brewOff', () => {
    brewOff()
  })

  setInterval(() => {
    if (!isReachable(`${config.get<string>('ipAddress')}:${config.get<number>('port')}`)) {
      publish('smarterCoffeeMachine/status', { isOn: false }, { retain: true, qos: 2 })

      logger.log({
        level: 'error',
        message: 'Coffee machine is offline',
      })
    } else {
      logger.log({
        level: 'info',
        message: 'Coffee machine is reachable',
      })
    }
  }, 150000) // 2,5min
}

logger.log({
  level: 'info',
  message: 'Smarter Coffee Machine service started',
})

init()
