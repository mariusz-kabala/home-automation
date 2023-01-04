import { ShellyModel } from '@home/models'
import { mongoose } from '@home/mongoose-client'
import { logger } from '@home/logger'
import { updateActionHook } from '@home/shelly-api'

const VALID_HOOKS = ['btn_on_url', 'btn_off_url', 'longpush_url', 'shortpush_url', 'out_on_url', 'out_off_url']

function run() {
  const { DEVICES, HOOK, URLS, ENABLED } = process.env

  if (!DEVICES || DEVICES === '') {
    logger.error(`Please specify list of devices to updates, separate devices names with a comma`)
    process.exit(1)
  }

  if (!HOOK || !VALID_HOOKS.includes(HOOK)) {
    logger.error(`Provided hook name is invalid, supported hooks: ${VALID_HOOKS.join(', ')}`)
    process.exit(1)
  }

  if (!URLS || URLS === '') {
    logger.error('Please specify list of urls to call with the hook, separate urls with a comma')
    process.exit(1)
  }

  const devices = DEVICES.split(',')
    .map(d => d.trim())
    .filter(d => d)
  const urls = URLS.split(',')
    .map(d => d.trim())
    .filter(d => d)

  if (devices.length === 0) {
    logger.error('No valid devices provided')
    process.exit(1)
  }

  if (urls.length === 0) {
    logger.error('No valid urls provided')
    process.exit(1)
  }

  mongoose.connection.on('error', err => {
    logger.error(`${err}`)
    process.exit(1)
  })

  mongoose.connection.on('open', async () => {
    const shellies = await ShellyModel.find({
      name: {
        $in: devices,
      },
    })

    if (shellies.length === 0) {
      logger.error('No devices found in DB')
      process.exit(1)
    }

    for (const shelly of shellies) {
      if (!shelly.status.wifi_sta.connected) {
        logger.error(`Device ${shelly.label} (${shelly.name}) not connected to Wifi, skipping`)
        continue
      }
      const relays = shelly.status.relays.length

      for (let index = 0; index < relays; index += 1) {
        logger.info(`Updating action hook for ${shelly.label} (${shelly.name})`)
        updateActionHook(shelly.status.wifi_sta.ip, {
          index: `${index}`,
          enabled: ENABLED ? 'true' : 'false',
          name: HOOK,
          urls: urls.map(url => url.replace(':name', shelly.name).replace(':relay', `${index}`)),
        })
      }
    }

    logger.info(`Finished, updated: ${shellies.length} devices`)
    process.exit(0)
  })
}

run()
