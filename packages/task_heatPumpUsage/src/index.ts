import config from 'config'
import fetch from 'node-fetch'

const CLOUD_URL = 'https://app.melcloud.com/Mitsubishi.Wifi.Client'

const APP_VERSION = '1.25.0.1'

const DEVICE_ID = 28328216

const { MONTH, YEAR } = process.env

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate()
}

function getLastDayOfMonth(year: number, month: number) {
  const days = getDaysInMonth(year, month)

  return days < 10 ? `0${days}` : `${days}`
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

async function energyReport(token: string, from: string, to: string) {
  const response = await fetch(`${CLOUD_URL}/EnergyCost/Report`, {
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

  console.log(response)
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

  energyReport(
    token,
    `${YEAR}-${MONTH}-01T00:00:00`,
    `${YEAR}-${MONTH}-${getLastDayOfMonth(parseInt(YEAR, 10), parseInt(MONTH, 10))}T00:00:00`,
  )
}

run()
