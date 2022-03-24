import { IShelly, ConnectionStatus, ShellyModel } from '@home/models'
import { fetchSessions } from '@home/vernemq-api'
import { logger } from '@home/logger'
import { mongoose } from '@home/mongoose-client'
import { fetchStatus } from '@home/shelly-api'

async function checkHttpStatus(devices: IShelly[]) {
  for await (const device of devices) {
    let status
    try {
      status = await fetchStatus(device['@Home1IpAddress'])
    } catch (err) {
      logger.log({
        level: 'error',
        message: `Can not fetch shelly ${device.name} status from ${device['@Home0IpAddress']} address. Error ${err}`,
      })
    }

    if (!status) {
      try {
        status = await fetchStatus(device['@Home0IpAddress'])
      } catch (err) {
        logger.log({
          level: 'error',
          message: `Can not fetch shelly ${device.name} status from ${device['@Home0IpAddress']} address. Error ${err}`,
        })
      }
    }

    if (status) {
      device.status = status
      device.httpStatus = ConnectionStatus.connected
    } else {
      device.httpStatus = ConnectionStatus.disconnected
    }

    try {
      await device.save()
    } catch (err) {
      logger.log({
        level: 'error',
        message: `Can not update shelly ${device.name} device status; error: ${err}`,
      })
    }
  }

  logger.log({
    level: 'info',
    message: 'HTTP devices status successfully updated',
  })
}

function updateDevicesStatus(devices: IShelly[]) {
  return fetchSessions()
    .then(({ table }) => {
      const promises = []

      for (const device of devices) {
        const mqttStatus = table.find(session => session.client_id === `${device.type}-${device.deviceId}`)

        device.mqttStatus =
          mqttStatus && mqttStatus.is_online ? ConnectionStatus.connected : ConnectionStatus.disconnected

        promises.push(
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
            }),
        )
      }

      return Promise.all(promises)
    })
    .then(() => {
      logger.log({
        level: 'info',
        message: 'MQTT devices status successfully updated',
      })
    })
    .catch(err => {
      logger.log({
        level: 'error',
        message: `Can not fetch connected devices status from VerneMQ API; error: ${err}`,
      })
      process.exit(1)
    })
}

function run() {
  mongoose.connection.once('open', async () => {
    const devices = await ShellyModel.find({})

    await updateDevicesStatus(devices)
    await checkHttpStatus(devices)

    process.exit(0)
  })
}

run()
