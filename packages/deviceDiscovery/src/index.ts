import config from 'config'
import { subscribe, publish } from '@home/mqtt'
import { logger } from '@home/logger'
import { IDevice } from './types'
import isReachable from 'is-reachable'

const devices = config.get<IDevice[]>('devices')

const timeIntervals: {
  [device: string]: NodeJS.Timeout
} = {}

function getCheckDeviceFunc(device: IDevice) {
  return async () => {
    const status: boolean = await isReachable(device.address)

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
            message: `Can not check device ${deviceName}, device is unknown`
        })
        return
    }

    const checker = getCheckDeviceFunc(device)

    await checker()
  })
}

initIntervals()
initSubscriptions()

logger.log({
    level: 'info',
    message: 'Device Discovery service started'
})
