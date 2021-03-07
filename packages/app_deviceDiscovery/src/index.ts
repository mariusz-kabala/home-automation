import config from 'config'
import { subscribe, publish } from '@home/mqtt'
import { logger } from '@home/logger'
// eslint-disable-next-line
import isReachable from 'is-reachable'
import ping from 'ping'

import { IDevice } from './types'

const devices = config.get<IDevice[]>('devices')
let connectedToRouter: string[] = []

function isConnectedToRouter(device: IDevice) {
  if (!device.mac) {
    return false
  }
  return connectedToRouter.includes(device.mac.toLowerCase())
}

const timeIntervals: {
  [device: string]: NodeJS.Timeout
} = {}

async function checkDevice(device: IDevice) {
  if (device.mac) {
    return isConnectedToRouter(device)
  }

  if (device.port) {
    return isReachable(`${device.address}:${device.port}`)
  }

  const result = await ping.promise.probe(device.address, {
    timeout: 2,
  })

  return result.alive
}

function getCheckDeviceFunc(device: IDevice) {
  return async () => {
    const status: boolean = await checkDevice(device)

    logger.log({
      level: 'info',
      message: `Device ${device.name} is ${status ? 'online' : 'offline'}`,
    })

    publish(`devices/${device.name}/status`, { isReachable: status }, { retain: true, qos: 1 })
  }
}

function initIntervals() {
  for (const device of devices) {
    timeIntervals[device.name] = setInterval(getCheckDeviceFunc(device), device.checkInterval)
  }
}

function initSubscriptions() {
  subscribe('devices/+/checkStatus', async (_msg: null, topic: string) => {
    const [, deviceName] = topic.split('/')
    const device = devices.find(d => d.name === deviceName)

    if (!device) {
      logger.log({
        level: 'error',
        message: `Can not check device ${deviceName}, device is unknown`,
      })
      return
    }

    const checker = getCheckDeviceFunc(device)

    await checker()
  })

  subscribe('openwrt/clients', (msg: string[]) => {
    logger.log({
      level: 'info',
      message: `List of connected router devices: ${JSON.stringify(msg)}`,
    })
    connectedToRouter = msg.map(mac => mac.toLowerCase())
  })
}

async function start() {
  for (const device of devices) {
    await getCheckDeviceFunc(device)()
  }
}

initIntervals()
initSubscriptions()
start()

logger.log({
  level: 'info',
  message: 'Device Discovery service started',
})
