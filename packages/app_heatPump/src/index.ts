import { HeatPump } from './lib/pump'
import config from 'config'

async function run() {
  const pump = new HeatPump(config.get<string>('heatPumpUsername'), config.get<string>('heatPumpPassword'))

  await pump.login()
  await pump.getStatus()
}

run()
