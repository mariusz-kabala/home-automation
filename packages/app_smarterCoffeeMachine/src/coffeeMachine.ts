import net from 'net'

import config from 'config'
import { logger } from '@home/logger'
import isEqual from 'lodash.isequal'
import { publish } from '@home/mqtt'

import {
  STATUS_OK,
  STATUS_NO_CARAFFE,
  CMD_SET_CONFIG,
  CMD_ENABLE_WARMING,
  CMD_END,
  BREW_ON,
  BREW_OFF,
  MSG_TERMINATOR,
} from './constants'
import { IStatus } from './types'

let oldStatus: IStatus | undefined
let timeout: NodeJS.Timeout | undefined

/** @this { client: net.Socket } */
function handleCoffeeMachineResponse(this: { client: net.Socket }, response: number[]): void {
  if (!response || response.length === 0) {
    return
  }

  const { client } = this

  if (response[0] === 0x3) {
    // acknowledgementReplyByte
    if (response[1] === STATUS_OK) {
      logger.log({
        level: 'info',
        message: 'Status OK',
      })
    }

    if (response[1] === STATUS_NO_CARAFFE) {
      logger.log({
        level: 'error',
        message: 'No carafe',
      })
    }
  } else if (response[0] === 0x32) {
    logger.log({
      level: 'info',
      message: `Received status message ${response.join(',')}`,
    })

    const isGrindInProgress: boolean = (response[1] & 8) >= 1
    const isWaterPumpInProgress: boolean = (response[1] & 16) >= 1

    const status: IStatus = {
      isOn: true,
      isBrewing: isGrindInProgress || isWaterPumpInProgress,
      isCarafeDetected: (response[1] & 1) >= 1,
      isGrind: (response[1] & 2) >= 1,
      isHotplateOn: (response[1] & 64) >= 1,
      waterLevel: response[2] & 15,
      strength: response[4] & 3,
      cups: response[5] & 15,
      isReady: (response[1] & 4) >= 1,
      isCycleComplete: (response[1] & 32) >= 1,
    }

    if (isEqual(oldStatus, status) === true) {
      return
    }

    publish('smarterCoffeeMachine/status', status, { retain: true, qos: 2 })

    oldStatus = status

    logger.info({
      level: 'info',
      message: `Status update ${JSON.stringify(status)}`,
    })

    // notifications
    if (status.isBrewing === true) {
      logger.info({
        level: 'info',
        message: `Coffee machine is brewing`,
      })
      publish('smarterCoffeeMachine/isBrewing', null)
    }

    if (status.isReady === true && status.isCarafeDetected === true && status.waterLevel > 0) {
      logger.info({
        level: 'info',
        message: `Coffee is ready`,
      })
      publish('smarterCoffeeMachine/coffeeIsReady', null)
      client.end()
    }

    if (status.waterLevel === 0) {
      logger.info({
        level: 'error',
        message: `No water in coffee machine`,
      })
      publish('smarterCoffeeMachine/noWater', null)
      client.end()
    }
  }
}

export function sendBytes(buffer: Buffer) {
  if (typeof timeout !== 'undefined') {
    // already connected to device, something is in progress, return current status
    logger.log({
      level: 'info',
      message: 'Device is working, skipping action, sending current status',
    })

    publish('smarterCoffeeMachine/status', oldStatus)
    return
  }

  const client = new net.Socket()
  const port = config.get<number>('port')
  const ipAddress = config.get<string>('ipAddress')
  const clear = () => {
    client.destroy()
    clearTimeout(timeout as NodeJS.Timeout)
    timeout = undefined
    oldStatus = undefined
  }

  client.connect(port, ipAddress, () => {
    logger.log({
      level: 'info',
      message: `Connected to the coffee machine ${ipAddress}:${port}`,
    })

    client.write(buffer)
    timeout = setTimeout(() => client.end(), 1200000) // 20 min
  })

  client.on('error', (error: Error) => {
    logger.log({
      level: 'error',
      message: `Error in stream from the coffee machine (${error})`,
    })

    clear()
  })

  client.on('timeout', () => {
    logger.log({
      level: 'error',
      message: 'Timeout from the coffee machine',
    })

    clear()
  })

  client.on('end', () => {
    logger.log({
      level: 'info',
      message: 'Disconnected from the coffee machine',
    })

    clear()
  })

  client.on('data', handleCoffeeMachineResponse.bind({ client }))
}

export function enableWarming(time = 10): void {
  sendBytes(new Buffer([CMD_SET_CONFIG, CMD_ENABLE_WARMING, time, CMD_END]))
}

export function brewOn(useGrind = 1, cups = 5, strength = 2): void {
  sendBytes(new Buffer([BREW_ON, cups, strength, 0x5, useGrind, MSG_TERMINATOR]))
}

export function brewOff() {
  sendBytes(new Buffer([BREW_OFF, 0, MSG_TERMINATOR]))
}
