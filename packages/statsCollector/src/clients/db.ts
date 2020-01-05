import * as Influx from 'influx'
import config from 'config'
import { logger } from '@home/logger'

const uri = `http://${config.get<string>('dbUser')}:${config.get<string>('dbPass')}@${config.get<string>(
  'dbHost',
)}:${config.get<string>('dbPort')}`
export const influx = new Influx.InfluxDB(`${uri}/${config.get<string>('dbName')}`)

export function createDBIfNeeded(dbName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    influx
      .getDatabaseNames()
      .then((databases: string[]) => {
        logger.log({
          level: 'debug',
          message: `Influx databases: ${JSON.stringify(databases)}`,
        })

        if (!databases.includes(dbName)) {
          logger.log({
            message: `Database ${dbName} doesn't exist, going to create it`,
            level: 'info',
          })
          influx.createDatabase(dbName).then(() => resolve())
        } else {
          resolve()
        }
      })
      .catch(err => {
        logger.log({
          level: 'error',
          message: err,
        })
        reject(err)
      })
  })
}
