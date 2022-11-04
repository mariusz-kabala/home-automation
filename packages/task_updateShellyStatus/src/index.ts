import { IShelly, ConnectionStatus, ShellyModel } from '@home/models'
import { fetchClients } from '@home/emqx-api'
import { logger } from '@home/logger'
import { mongoose } from '@home/mongoose-client'
import { fetchStatus } from '@home/shelly-api'

async function checkHttpStatus(devices: IShelly[]) {
  for await (const device of devices) {
    let status, connected
    const networks = [...device.networks]

    for (const network of networks) {
      if (connected && network.wifi !== connected) {
        network.isConnected = false

        continue
      }

      try {
        status = await fetchStatus(network.address)

        network.isConnected = true
        connected = network.wifi
      } catch (err) {
        network.isConnected = false
        logger.log({
          level: 'error',
          message: `Can not fetch shelly ${device.name} status from ${network.address} address. Error ${err}`,
        })
      }
    }

    device.networks = networks

    if (status) {
      device.status = status
      device.httpStatus = ConnectionStatus.connected
    } else {
      device.httpStatus = ConnectionStatus.disconnected
      device.status = undefined
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
  return fetchClients()
    .then(({ data }) => {
      const promises = []

      for (const device of devices) {
        const mqttStatus = data.find(session => session.clientid === device.hostname)

        device.mqttStatus =
          mqttStatus && mqttStatus.connected ? ConnectionStatus.connected : ConnectionStatus.disconnected

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
        message: `Can not fetch connected devices status from EMQX API; error: ${JSON.stringify(err)}`,
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
