import isReachable from 'is-reachable'
import config from 'config'

import { TV } from './tv'

const connected: {
  [key: string]: TV
} = {}

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

async function checkIfDevicesAreReachable() {
  const devices = config.get<{
    [name: string]: string
  }>('devices')

  for (const device of Object.keys(devices)) {
    const deviceIP = devices[device]
    const isDeviceReachable = await isReachable(`${deviceIP}:3000`, { timeout: 1000 })

    if (isDeviceReachable && !connected[device] && tvKeys[deviceIP]) {
      connected[device] = new TV(deviceIP, device, tvKeys[deviceIP])
    } else if (!isDeviceReachable && connected[device]) {
      // todo: use Promise.all to not wait for device
      await connected[device].disconnect()

      delete connected[device]
    }
  }
}

setInterval(checkIfDevicesAreReachable, 30000)

checkIfDevicesAreReachable()
