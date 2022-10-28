import config from 'config'
import fetch from 'node-fetch'
import { Point } from '@influxdata/influxdb-client'
import { InfluxDB } from '@influxdata/influxdb-client'

const CLOUD_URL = 'https://app.melcloud.com/Mitsubishi.Wifi.Client'

const APP_VERSION = '1.25.0.1'

const DEVICE_ID = 28328216

const { MONTH, YEAR } = process.env

interface IReportResponse {
  HotWater: number[]
  Heating: number[]
  ProducedHotWater: number[]
  ProducedHeating: number[]
  Labels: number[]
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate()
}

function getLastDayOfMonth(year: number, month: number) {
  const days = getDaysInMonth(year, month)

  return days < 10 ? `0${days}` : `${days}`
}

function getInfluxDbWriteAPI() {
  const influxDB = new InfluxDB({
    url: `http://${config.get<string>('statsDb.host')}:${config.get<number>('statsDb.port')}`,
    token: config.get<string>('statsDb.token'),
  })

  return influxDB.getWriteApi(config.get<string>('statsDb.organisation'), config.get<string>('statsDb.bucket'), 'ms')
}

async function login() {
  const response = await fetch(`${CLOUD_URL}/Login/ClientLogin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Email: config.get<string>('heatPumpUsername'),
      Password: config.get<string>('heatPumpPassword'),
      Language: 0,
      AppVersion: APP_VERSION,
      Persist: false,
      CaptchaResponse: null,
    }),
  }).then(res => res.json())

  const {
    LoginData: { ContextKey },
  } = response

  return ContextKey
}

async function energyReport(token: string, from: string, to: string): Promise<IReportResponse> {
  return await fetch(`${CLOUD_URL}/EnergyCost/Report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-mitscontextkey': token,
    },
    body: JSON.stringify({
      DeviceId: DEVICE_ID,
      FromDate: from,
      ToDate: to,
      UseCurrency: false,
    }),
  }).then(res => res.json())
}

async function run() {
  if (!MONTH || MONTH == '') {
    console.error(`MONTH param (${MONTH}) is invalid`)
    process.exit(1)
  }

  if (!YEAR || YEAR == '') {
    console.error(`YEAR param (${YEAR}) is invalid`)
    process.exit(1)
  }

  const token = await login()

  const report = await energyReport(
    token,
    `${YEAR}-${MONTH}-01T00:00:00`,
    `${YEAR}-${MONTH}-${getLastDayOfMonth(parseInt(YEAR, 10), parseInt(MONTH, 10))}T00:00:00`,
  )

  const writeAPI = getInfluxDbWriteAPI()

  for (let x = 0; x < report.Labels.length; x += 1) {
    const water = report.HotWater[x]
    const heating = report.Heating[x]
    const producedWater = report.ProducedHotWater[x]
    const producedHeating = report.ProducedHeating[x]
    const day = report.Labels[x]

    const point = new Point('energy')
      .tag('deviceName', 'heatPump')
      .floatField('water', water)
      .floatField('heating', heating)
      .floatField('producedWater', producedWater)
      .floatField('producedHeating', producedHeating)
      .timestamp(new Date(`${MONTH} ${day} ${YEAR}`))

    console.info(`DATE: ${day} - ${MONTH} - ${YEAR}`)
    console.info(`water: ${water} kWh`)
    console.info(`heating: ${heating} kWh`)
    console.info(`producedWater: ${producedWater} kWh`)
    console.info(`producedHeating: ${producedHeating} kWh`)
    console.info('---')
    writeAPI.writePoint(point)
  }

  try {
    await writeAPI.flush()
    console.info('done')
    process.exit(0)
  } catch (err) {
    console.error('Db write failed', err)
    process.exit(1)
  }
}

run()
