import { app } from './app'
import config from 'config'
import { logger } from '@home/logger'
import { registerInConsul } from '@home/consul'

const SERVICE_NAME = 'ShellyMonitoring'

const port = config.get<number>('port') || 3000

registerInConsul(SERVICE_NAME, port)

app.listen(port, () => {
  logger.log({
    level: 'info',
    message: `${SERVICE_NAME} started on port ${port}`,
  })
})
