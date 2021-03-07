import { logger } from '@home/logger'
import { registerInConsul } from '@home/commons'

import { subscribeForGroupsMessages } from './handlers/groups'

function start() {
  subscribeForGroupsMessages()

  logger.log({
    level: 'info',
    message: 'Application started',
  })
}

start()
registerInConsul('mqtt2http')
