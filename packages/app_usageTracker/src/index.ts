import { initApp } from './app'
import { mongoose } from '@home/mongoose-client'
import { logger } from '@home/logger'
import { registerInConsul } from '@home/consul'
import config from 'config'

const SERVICE_NAME = 'UsageTracker'

function onMongooseStart() {
  logger.info('MongoDB connection established')
}

mongoose.connection.on('error', err => {
  logger.error(`${err}`)
  process.exit(1)
})

mongoose.connection.on('open', onMongooseStart)

function start() {
  const app = initApp()

  const port = config.get<number>('port') || 3000

  registerInConsul(SERVICE_NAME, port)

  app.listen(port, () => {
    logger.log({
      level: 'info',
      message: `${SERVICE_NAME} started on port ${port}`,
    })
  })
}

start()
