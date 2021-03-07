import { logger } from '@home/logger'

import { subscribeForGroupsMessages } from './handlers/groups'

function start() {
  subscribeForGroupsMessages()

  logger.log({
    level: 'info',
    message: 'Application started',
  })
}

start()
