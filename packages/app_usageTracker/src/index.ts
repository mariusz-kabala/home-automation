import { initApp } from './app'
import { mongoose } from '@home/mongoose-client'
import { logger } from '@home/logger'
import { registerInConsul } from '@home/consul'
import config from 'config'

const SERVICE_NAME = 'usage-tracker'

function onMongooseStart() {
  logger.info('MongoDB connection established')
}

mongoose.connection.on('error', err => {
  logger.error(`${err}`)
  process.exit(1)
})

mongoose.connection.on('open', onMongooseStart)

async function start() {
  const app = initApp()

  const port = parseInt(config.get<string>('port'), 10) || 3000

  try {
    await registerInConsul(SERVICE_NAME, port)
  } catch (err) {
    logger.error(`Consul registration error ${err}`)
    process.exit(1)
  }

  app.listen(port, () => {
    logger.log({
      level: 'info',
      message: `${SERVICE_NAME} started on port ${port}`,
    })
  })
}

start()
