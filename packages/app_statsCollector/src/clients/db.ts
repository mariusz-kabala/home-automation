import { InfluxDB } from '@influxdata/influxdb-client'
import config from 'config'

export const client = new InfluxDB({
  url: `http://${config.get<string>('dbHost')}:${config.get<number>('dbPort')}`,
  token: config.get<string>('token'),
})

export const sensorsWriteApi = client.getWriteApi(
  config.get<string>('organisation'),
  config.get<string>('buckets.sensors'),
  'ms',
)

export const lightsWriteApi = client.getWriteApi(
  config.get<string>('organisation'),
  config.get<string>('buckets.lights'),
  'ms',
)
