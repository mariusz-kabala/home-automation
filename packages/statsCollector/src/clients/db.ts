import { InfluxDB } from '@influxdata/influxdb-client'
import config from 'config'

export const client = new InfluxDB({
  url: `http://${config.get<string>('dbHost')}:${config.get<number>('dbPort')}`,
  token: config.get<string>('token'),
})

export const writeApi = client.getWriteApi(config.get<string>('organisation'), config.get<string>('bucket'), 'ms')
