import mongoose from 'mongoose'
import config from 'config'
import { logger } from '@home/logger'

mongoose.set('strictQuery', false)

mongoose
  .connect(config.get('mongoConnectionStr'))
  .then(() => {
    logger.log({
      message: 'Connection with mongoDB established',
      level: 'info',
    })
  })
  .catch(err => {
    logger.log({
      message: `Database error: ${err}`,
      level: 'error',
    })
  })

export { mongoose }
