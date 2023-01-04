import cron from 'node-cron'
import config from 'config'
import { logger } from '@home/logger'
import { registerInConsul } from '@home/consul'
import { Store } from '@home/commons'
import { getRunAirVisual } from './providers/airvisual'
import { getRunAqicnorg } from './providers/aqicnorg'
import { initApp } from './app'

const store = new Store()
const port = config.get<number>('port') || 3000
const app = initApp(store)

async function start() {
  const runAirVisual = getRunAirVisual(store)
  const runAqicnorg = getRunAqicnorg(store)

  await runAirVisual()
  // 10000 calls per month
  cron.schedule('*/30 * * * *', runAirVisual)

  await runAqicnorg()
  // 1000 per second
  cron.schedule('*/5 * * * *', runAqicnorg)
}

start()

registerInConsul('pollutionReports', port)

app.listen(port, () => {
  logger.log({
    level: 'info',
    message: `PollutionReports started on port ${port}`,
  })
})
