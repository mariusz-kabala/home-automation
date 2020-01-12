import isReachable from 'is-reachable'
import config from 'config'
import { subscribe, publish } from '@home/mqtt'

import { TV } from './tv'
import { logger } from '@home/logger'

interface IBufforMsg {
  topic: string
  msg: any
  time: number
}

const connected: {
  [key: string]: TV
} = {}

const devices = config.get<{
  [name: string]: string
}>('devices')

const buffor = Object.keys(devices).reduce((all: { [device: string]: IBufforMsg[] }, device: string) => {
  all[device] = []

  return all
}, {})

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

function flushBuffer(device: string, resolve?: () => void): any {
  if (!resolve) {
    return new Promise(localResolve => flushBuffer(device, localResolve))
  } else {
    const bmsg = buffor[device].shift()

    if (!bmsg) {
      return resolve()
    }

    connected[device].runCommand(bmsg.msg, bmsg.topic)

    setTimeout(() => flushBuffer(device, resolve), 250)
  }
}

async function checkIfDevicesAreReachable() {
  for (const device of Object.keys(devices)) {
    const deviceIP = devices[device]
    const isDeviceReachable = await isReachable(`${deviceIP}:3000`, { timeout: 1000 })

    if (isDeviceReachable && !connected[device] && tvKeys[deviceIP]) {
      connected[device] = new TV(deviceIP, device, tvKeys[deviceIP])

      await flushBuffer(device)

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

function initBuffor() {
  subscribe('tv/+/+', (msg: any, topic: string) => {
    const [, device] = topic.split('/')

    if (connected[device]) {
      return
    }

    const now = new Date().getTime()

    buffor[device].push({
      topic,
      msg,
      time: now,
    })

    publish(`tv/${device}/turnOn`, {})
  })
}

function clearBuffer() {
  const now = new Date().getTime()

  for (const device of Object.keys(buffor)) {
    buffor[device] = buffor[device].filter(msg => !(now - msg.time > 600000))
  }
}

subscribeForAlerts()
setInterval(checkIfDevicesAreReachable, 5000) // 5sec

checkIfDevicesAreReachable()

initBuffor()

setInterval(clearBuffer, 300000) // 5 min

logger.log({
  level: 'info',
  message: 'Lg2mqtt started',
})
