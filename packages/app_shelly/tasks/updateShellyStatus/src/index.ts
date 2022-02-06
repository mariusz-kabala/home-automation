import { updateDevicesStatus } from '@app/lib/verneMQ'

import { logger } from '@home/logger'

function run() {
  logger.log({
    level: 'info',
    message: 'Running the update Shelly Status task',
  })
}

run()
