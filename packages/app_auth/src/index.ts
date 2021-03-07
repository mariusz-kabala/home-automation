import config from 'config'
import { logger } from '@home/logger'

import { app } from './app'

const port = config.get<number>('port') || 3000

app.listen(port, () => {
  logger.info(`Auth service started on port ${port}`)
})
