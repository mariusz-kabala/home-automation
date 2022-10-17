const fetch = require('node-fetch')
const dotenv = require('dotenv')
const { ShellyModel } = require('@home/models')
const { mongoose } = require('@home/mongoose-client')

dotenv.config()

const { DEVICES } = process.env

async function fetchShellyData(ip) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), 5000)

  const settings = await fetch(`http://${ip}/settings`, {
    headers: {
      Accept: 'application/json',
    },
    signal: controller.signal,
  })
    .then(res => res.json())
    .catch(err => ({
      status: 'offline',
    }))
  clearTimeout(id)

  if (settings?.status === 'offline') {
    return {
      ip,
      status: 'offline',
    }
  }

  const networks = []

  if (settings.wifi_sta?.enabled) {
    networks.push({
      wifi: settings.wifi_sta.ssid,
      address: settings.wifi_sta.ip,
    })
  }

  if (settings.wifi_sta1?.enabled) {
    networks.push({
      wifi: settings.wifi_sta1.ssid,
      address: settings.wifi_sta1.ip,
    })
  }

  const result = await ShellyModel.findOneAndUpdate(
    { name: settings.name },
    {
      hostname: settings.device.hostname,
    },
  )

  console.log(result)

  return {
    name: settings.name,
    deviceId: settings.device.mac,
    hostname: settings.device.hostname,
    macAddress: settings.device.mac.match(/.{1,2}/g).join(':'),
    networks,
    type: settings.device.type,
  }
}

async function run() {
  const devicesArr =
    DEVICES?.split(',')
      .map(ip => ip.trim())
      .filter(ip => ip) ?? []

  if (devicesArr.length === 0) {
    console.error('Please provide list of devices ip addresses to check')
    return
  }

  const result = await Promise.all(devicesArr.map(ip => fetchShellyData(ip)))

  console.log(
    JSON.stringify(
      result.map(r => `${r.name ?? r.ip} - ${r.hostname}`),
      null,
      2,
    ),
  )
}

run()
