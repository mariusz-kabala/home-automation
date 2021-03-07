import mongoose from 'mongoose'
import config from 'config'
import { logger } from '@home/logger'

mongoose.set('useCreateIndex', true)

let dbCredentials = ''

if (config.has('dbUser') && config.has('dbPassword')) {
  dbCredentials = `${config.get<string>('dbUser')}:${config.get<string>('dbPassword')}@`
}

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

const mongooseOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const mongoDbURL = `mongodb://${dbCredentials}${config.get<string>('dbHost')}/${config.get<string>('dbName')}`

mongoose.connect(mongoDbURL, mongooseOpts)

mongoose.Promise = global.Promise

export default mongoose
