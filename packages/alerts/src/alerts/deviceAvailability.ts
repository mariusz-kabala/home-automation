import config from 'config'
import { IWatchedDevice } from '../types'
import { subscribe, publish } from '@home/mqtt'
import { logger } from '@home/logger'

const devicesToWatch = config.get<IWatchedDevice[]>('watchedDevices')
const recentAlerts: {
  [device: string]: NodeJS.Timeout
} = {}

export function deviceAvailabilityAlerts() {
  subscribe('devices/+/status', (msg: { isReachable: boolean }, topic: string) => {
    if (msg.isReachable) {
      return // do nothing, all good
    }

    const [, deviceName] = topic.split('/')
    const alertDefinition = devicesToWatch.find(entry => entry.device === deviceName)

    if (!alertDefinition) {
      return // no alert for that device
    }

    const pubTopic = `alert/deviceAvailability/${deviceName}/${alertDefinition.level}`
    const alert = `Device ${deviceName} is offline`

    if (typeof recentAlerts[deviceName] === 'undefined') {
      publish(pubTopic, {
        alert,
      })

      recentAlerts[deviceName] = setTimeout(() => {
        delete recentAlerts[deviceName]
      }, 900000) // 15min

      logger.log({
        level: 'info',
        message: `publishing a new alert ${pubTopic} : ${alert}`,
        alertLevel: alertDefinition.level,
      })
    } else {
      logger.log({
        level: 'info',
        message: `skipping a new alert ${pubTopic} : ${alert}`,
        alertLevel: alertDefinition.level,
      })
    }
  })
}
