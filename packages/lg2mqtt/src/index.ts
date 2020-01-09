import isReachable from 'is-reachable'
import config from 'config'

import { TV } from './tv'

const connected: {
  [key: string]: TV
} = {}

async function checkIfDevicesAreReachable() {
  const devices = config.get<{
    [name: string]: string
  }>('devices')

  for (const device of Object.keys(devices)) {
    const deviceIP = devices[device]
    const isDeviceReachable = await isReachable(`${deviceIP}:3000`, { timeout: 1000 })

    if (isDeviceReachable && !connected[device]) {
      connected[device] = new TV(deviceIP, device)
    } else if (!isDeviceReachable && connected[device]) {
      await connected[device].disconnect()

      delete connected[device]
    }
  }
}

setInterval(checkIfDevicesAreReachable, 30000)

checkIfDevicesAreReachable()
