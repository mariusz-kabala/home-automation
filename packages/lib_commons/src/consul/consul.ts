import Consul from 'consul'
import config from 'config'

export const consul = Consul({
  host: config.get<string>('consulHost'),
  port: config.get<string>('consulPort'),
})
