import { initApp } from './app'
import { mongoose } from '@home/mongoose-client'
import { logger } from '@home/logger'

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
}

start()
