import mongoose from 'mongoose'
import config from 'config'
import { logger } from '@home/logger'

const db = mongoose.connection

db.on('error', err => {
  logger.log({
    message: `Database error: ${err}`,
    level: 'error',
  })
})
db.once('open', () => {
  logger.log({
    message: 'Connection with mongoDB established',
    level: 'info',
  })
})

mongoose.connect(config.get('mongoConnectionStr'))

mongoose.Promise = global.Promise

export { mongoose }
