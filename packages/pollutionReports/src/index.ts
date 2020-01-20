import cron from 'node-cron'
import { runAirVisual } from './providers/airvisual'
import { runAqicnorg } from './providers/aqicnorg'
import { logger } from '@home/logger'

async function start() {
    await runAirVisual()
    cron.schedule('*/10 * * * *', runAirVisual)

    await runAqicnorg()
    cron.schedule('*/10 * * * *', runAqicnorg)
}

start()

logger.log({
    level: 'info',
    message: 'PollutionReports started'
})
