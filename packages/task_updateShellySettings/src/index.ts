import { IShelly, ShellyModel } from '@home/models'
import { mongoose } from '@home/mongoose-client'
import { fetchSettings } from '@home/shelly-api'
import { logger } from '@home/logger'

async function checkHttpSettings(devices: IShelly[]) {
  for await (const device of devices) {
    let settings

    for (const network of device.networks) {
      try {
        settings = await fetchSettings(network.address)

        break
      } catch (err) {
        logger.log({
          level: 'error',
          message: `Can not fetch shelly ${device.name} settings from ${network.address} address. Error ${err}`,
        })
      }
    }

    if (settings) {
      device.settings = settings

      try {
        await device.save()

        logger.log({
          level: 'info',
          message: `Settings for ${device.name} has been successfully updated`,
        })
      } catch (err) {
        logger.log({
          level: 'error',
          message: `Can not update shelly ${device.name} device status; error: ${err}`,
        })
      }
    } else {
      logger.log({
        level: 'error',
        message: `Unable to fetch settings for ${device.name}`,
      })
    }
  }
}

function run() {
  mongoose.connection.once('open', async () => {
    const devices = await ShellyModel.find({})

    await checkHttpSettings(devices)

    process.exit(0)
  })
}

run()
