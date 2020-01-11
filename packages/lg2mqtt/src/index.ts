import isReachable from 'is-reachable'
import config from 'config'
import wol from 'node-wol'
import { subscribe } from '@home/mqtt'

import { TV } from './tv'
import { logger } from '@home/logger'

const connected: {
  [key: string]: TV
} = {}

const devices = config.get<{
  [name: string]: string
}>('devices')

let lastNotSentAlert: string | undefined

let clearLastNotSentAlertTimeout: NodeJS.Timeout | undefined

const tvKeys = (() => {
  const keysStr = config.get<string>('tvKeys')
  const keys: {
    [ip: string]: string
  } = {}
  const keysSplit = keysStr.split(';')

  for (const key of keysSplit) {
    const [ip, keyValue] = key.split(':')
    keys[ip] = keyValue
  }

  return keys
})()

function sentRecentAlert(device: TV) {
  if (!lastNotSentAlert) {
    return
  }

  device.showAlert(lastNotSentAlert)
  clearLastNotSentAlertTimeout && clearTimeout(clearLastNotSentAlertTimeout)
  lastNotSentAlert = undefined
}

async function checkIfDevicesAreReachable() {
  for (const device of Object.keys(devices)) {
    const deviceIP = devices[device]
    const isDeviceReachable = await isReachable(`${deviceIP}:3000`, { timeout: 1000 })

    if (isDeviceReachable && !connected[device] && tvKeys[deviceIP]) {
      connected[device] = new TV(deviceIP, device, tvKeys[deviceIP])
      lastNotSentAlert && sentRecentAlert(connected[device])
    } else if (!isDeviceReachable && connected[device]) {
      // todo: use Promise.all to not wait for device
      await connected[device].disconnect()

      delete connected[device]
    }
  }
}

function subscribeForAlerts() {
  subscribe('alert/+', (msg: { alert: string }) => {
    const connectedList: string[] = Object.keys(connected)

    if (connectedList.length > 0) {
      for (const device of connectedList) {
        connected[device].showAlert(msg.alert)
      }
    } else {
      typeof clearLastNotSentAlertTimeout !== 'undefined' && clearTimeout(clearLastNotSentAlertTimeout)

      lastNotSentAlert = msg.alert
      clearLastNotSentAlertTimeout = setTimeout(() => {
        lastNotSentAlert = undefined
      }, 900000) // 15min
    }
  })
}

function subscribeForWOL() {
  const macAddresses = config.get<{
    [name: string]: string
  }>('devicesMacAddresses')
  subscribe('tv/+/turnOn', (_msg: null, topic: string) => {
    const [, device] = topic.split('/')

    logger.log({
      level: 'info',
      message: `Turning on device ${device}`,
    })

    if (connected[device]) {
      logger.log({
        level: 'info',
        message: `Device ${device} already on, skipping WOL proccess`,
      })
      return
    }

    const mac = macAddresses[device]
    const ip = devices[device]

    if (!mac || !ip) {
      logger.log({
        level: 'error',
        message: `Unknown mac address for device ${device}, can not turn on`,
      })
      return
    }

    wol.wake(mac, { address: ip },  (err: Error | null) => {
      if (err) {
        logger.log({
          level: 'error',
          message: `Can not turn on device ${device}, error ${err}`,
        })
        return  
      }

      checkIfDevicesAreReachable()
    })
  })
}

subscribeForAlerts()
subscribeForWOL()
setInterval(checkIfDevicesAreReachable, 30000)

checkIfDevicesAreReachable()

logger.log({
  level: 'info',
  message: 'Lg2mqtt started',
})
