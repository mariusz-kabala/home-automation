import { subscribe } from '@home/mqtt'
import { logger } from '@home/logger'

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
}

logger.log({
  level: 'info',
  message: 'Smarter Coffee Machine service started',
})

init()
