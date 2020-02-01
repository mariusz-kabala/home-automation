import cron from 'node-cron'
import { logger } from '@home/logger'

import { runAirVisual } from './providers/airvisual'
import { runAqicnorg } from './providers/aqicnorg'

async function start() {
  await runAirVisual()
  // 10000 calls per month
  cron.schedule('*/5 * * * *', runAirVisual)

  await runAqicnorg()
  // 1000 per second
  cron.schedule('* * * * *', runAqicnorg)
}

start()

logger.log({
  level: 'info',
  message: 'PollutionReports started',
})
