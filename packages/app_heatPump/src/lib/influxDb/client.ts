import { InfluxDB } from '@influxdata/influxdb-client'
import config from 'config'

export const client = new InfluxDB({
  url: `http://${config.get<string>('statsDb.host')}:${config.get<number>('statsDb.port')}`,
  token: config.get<string>('statsDb.token'),
})

export const sensorsWriteApi = client.getWriteApi(
  config.get<string>('statsDb.organisation'),
  config.get<string>('statsDb.bucket'),
  'ms',
)
