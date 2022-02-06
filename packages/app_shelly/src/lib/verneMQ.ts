import { IShelly, MqttStatus } from '../models/shelly'
import { fetchSessions } from '@home/vernemq-api'
import { logger } from '@home/logger'

export function updateDevicesStatus(devices: IShelly[]) {
  return fetchSessions()
    .then(({ table }) => {
      for (const device of devices) {
        const mqttStatus = table.find(session => session.client_id === `${device.type}-${device.deviceId}`)

        device.mqttStatus = mqttStatus && mqttStatus.is_online ? MqttStatus.connected : MqttStatus.disconnected
        device
          .save()
          .then(() => {
            logger.log({
              level: 'info',
              message: `Shelly ${device.name} device status succesfully updated`,
            })
          })
          .catch(err => {
            logger.log({
              level: 'error',
              message: `Can not update shelly ${device.name} device status; error: ${err}`,
            })
          })
      }
    })
    .catch(err => {
      logger.log({
        level: 'error',
        message: `Can not fetch connected devices status from VerneMQ API; error: ${err}`,
      })
    })
}
