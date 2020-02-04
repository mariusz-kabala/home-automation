import config from 'config'
import * as Influx from 'influx'

const uri = `http://${config.get<string>('dbUser')}:${config.get<string>('dbPass')}@${config.get<string>(
  'dbHost',
)}:${config.get<string>('dbPort')}`

export const influx = new Influx.InfluxDB(`${uri}/${config.get<string>('dbName')}`)
