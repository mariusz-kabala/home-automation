import config from 'config'
import fetch from 'node-fetch'

const CLOUD_URL = 'https://app.melcloud.com/Mitsubishi.Wifi.Client'

const APP_VERSION = '1.25.0.1'

const DEVICE_ID = 28328216

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
      Persist: true,
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
  const token = await login()

  energyReport(token, '2022-07-24T00:00:00', '2022-10-25T00:00:00')
}

run()
