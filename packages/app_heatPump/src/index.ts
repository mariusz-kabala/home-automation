import { HeatPump } from './lib/pump'
import config from 'config'
import { difference } from '@home/commons'
import { mongoose } from '@home/mongoose-client'
import { parseStatus, IParsedStatus } from './lib/pump/parser'
import { logger } from '@home/logger'
import { publish, subscribe } from '@home/mqtt'
import cron from 'node-cron'
import { registerInConsul } from '@home/consul'

const UPDATE_INTERVAL = 60000 // 1min

const MQTT_TOPIC = 'heatpump'

let pump: HeatPump

interface Diff {
  operationMode?: boolean
  holidayMode?: boolean
  power?: boolean
  forcedHotWaterMode?: boolean
  outdoorTemperature?: number
  offline?: boolean
  water?: {
    temperature?: number
  }
  zones: {
    idle?: boolean
    temperature?: number
  }[]
}

mongoose.connection.on('error', err => {
  logger.error(`${err}`)
  process.exit(1)
})

function mqttUpdate(diff: Diff, status: IParsedStatus) {
  if (diff.water) {
    publish('water', status.water, {
      retain: true,
      qos: 0,
    })
  }

  if (Object.keys(diff.zones[0]).length > 0) {
    publish('zone0', status.zones[0], {
      retain: true,
      qos: 0,
    })
  }

  if (Object.keys(diff.zones[1]).length > 0) {
    publish('zone1', status.zones[1], {
      retain: true,
      qos: 0,
    })
  }

  const fields: ['outdoorTemperature', 'holidayMode', 'forcedHotWaterMode', 'operationMode', 'power', 'offline'] = [
    'outdoorTemperature',
    'holidayMode',
    'forcedHotWaterMode',
    'operationMode',
    'power',
    'offline',
  ]

  fields.forEach(field => {
    if (typeof diff[field] !== 'undefined') {
      publish(`${MQTT_TOPIC}/${field}`, diff[field], {
        retain: true,
        qos: 0,
      })
    }
  })
}

async function update(retry = false) {
  try {
    const status = await pump.getStatus()

    const [dbStatus] = await Promise.all([pump.updateDB(status), pump.updateStatsDB(status)])
    const diff: Diff = difference(dbStatus, parseStatus(status))

    mqttUpdate(diff, dbStatus)

    const error = await pump.checkForErrors(status)

    publish('error', error ?? null, {
      retain: true,
      qos: 0,
    })
  } catch (err) {
    logger.log({
      level: 'error',
      message: `Can not fetch update from melcloud, error: ${err}`,
    })

    if (retry) {
      process.exit(1)
    }

    await pump.login()
    update(true)
  }
}

async function run() {
  pump = new HeatPump(config.get<string>('heatPumpUsername'), config.get<string>('heatPumpPassword'))

  subscribeToMqttTopic()

  try {
    await pump.login()
  } catch (err) {
    logger.log({
      level: 'error',
      message: `Can not login into melcloud, error: ${err}`,
    })

    process.exit(1)
  }

  update()

  setInterval(update, UPDATE_INTERVAL)
}

async function saveEnergyReport() {
  const time = new Date()
  time.setDate(time.getDate() - 1) // yesterday

  await pump.updateEnergyReport(time.getDate(), time.getMonth() + 1, time.getFullYear())
}

function subscribeToMqttTopic() {
  subscribe('on', async () => {
    await pump.on()
    update()
  })

  subscribe('off', async () => {
    await pump.off()
    update()
  })

  subscribe('forcedHotWaterMode', async (payload) => {
    const value = payload === 'true' ? true : false

    await pump.forcedHotWaterMode(value)

    update()
  })


}

registerInConsul('HeatPump')
run()

cron.schedule('30 3 * * *', saveEnergyReport) // every day at 3:30am
