import { IShelly, MqttStatus, ShellyModel } from '@home/models'
import { fetchSessions } from '@home/vernemq-api'
import { logger } from '@home/logger'
import { mongoose } from '@home/mongoose-client'

function checkHttpStatus(devices: IShelly[]) {

}

function updateDevicesStatus(devices: IShelly[]) {
  return fetchSessions()
    .then(({ table }) => {
      const promises = []

      for (const device of devices) {
        const mqttStatus = table.find(session => session.client_id === `${device.type}-${device.deviceId}`)

        console.log('device ->' + device.label, `${device.type}-${device.deviceId} --> ${mqttStatus?.is_online}`)
        device.mqttStatus = mqttStatus && mqttStatus.is_online ? MqttStatus.connected : MqttStatus.disconnected

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
              console.log('error')
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
      console.log('evenything is done')
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

    console.log('devices -----')
    console.log(devices)

    await updateDevicesStatus(devices)

    process.exit(0)
  })
}

run()
