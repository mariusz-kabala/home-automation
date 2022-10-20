import { logger } from '@home/logger'
import { mongoose } from '@home/mongoose-client'
import { registerInConsul } from '@home/consul'
import { run as runShellyModule } from './modules/shelly'
import { run as runTasmotaMoudle } from './modules/tasmota'

mongoose.connection.on('error', err => {
  logger.error(`${err}`)
  process.exit(1)
})

function start() {
  runShellyModule()
  runTasmotaMoudle()

  logger.log({
    level: 'info',
    message: 'Application started',
  })
}

registerInConsul('statsCollector')
start()
