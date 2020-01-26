import * as TuyAPI from 'tuyapi'
import config from 'config'
import { subscribe, publish } from '@home/mqtt'
import { logger } from '@home/logger'
import { IDevice, IDevicePayload } from './types'

const devices: {
  [key: string]: {
    api: any
    isConnected: boolean
    isOn?: boolean
    currentVoltage?: number
  }
} = {}

function reconnect(device: any, deviceName: string) {
  device
    .find()
    .then(() => {
      device.connect()
    })
    .catch(() => {
      logger.log({
        level: 'error',
        message: `Can not connect to device ${deviceName}`,
      })

      publish(`tuyaPlugs/${deviceName}/connectionStatus`, {
        isConnected: false,
      })

      if (devices[deviceName]) {
        devices[deviceName].isConnected = false
      }

      setTimeout(() => reconnect(device, deviceName), 5000)
    })
}

function initDevice(config: IDevice) {
  const device = new TuyAPI({
    id: config.id,
    key: config.key,
  })

  device.on('connected', () => {
    logger.log({
      level: 'info',
      message: `Connected to ${config.name}`,
    })

    publish(`tuyaPlugs/${config.name}/connectionStatus`, {
      isConnected: true,
    })

    if (devices[config.name]) {
      devices[config.name].isConnected = true
    }
  })

  device.on('disconnected', () => {
    logger.log({
      level: 'error',
      message: `Device ${config.name} disconnected`,
    })

    publish(`tuyaPlugs/${config.name}/connectionStatus`, {
      isConnected: false,
    })

    if (devices[config.name]) {
      devices[config.name].isConnected = false
    }

    setTimeout(() => reconnect(device, config.name), 5000)
  })

  device.on('error', (error: Error) => {
    logger.log({
      level: 'error',
      message: `Error from device ${config.name} / error: ${error}`,
    })
  })

  device.on('data', (data: IDevicePayload) => {
    logger.log({
      level: 'info',
      message: `New data from device ${config.name} / ${JSON.stringify(data)}`,
    })

    if (data.dps['1']) {
      devices[config.name].isOn = data.dps['1']
    }

    if (data.dps['20']) {
      devices[config.name].currentVoltage = data.dps['20']
    }

    const status: {
      isOn?: boolean
      electric?: number
      power?: number
      voltage?: number
    } = {}

    if (typeof devices[config.name].isOn !== 'undefined') {
      status.isOn = devices[config.name].isOn
    }

    if (typeof devices[config.name].currentVoltage !== 'undefined') {
      status.voltage = devices[config.name].currentVoltage
    }

    if (data.dps['18']) {
      status.electric = data.dps['18']
    }

    if (data.dps['19']) {
      status.power = data.dps['19']
    }

    publish(`tuyaPlugs/${config.name}/status`, status)
  })

  return device
}

function initDevices() {
  const devicesToLoad = config.get<IDevice[]>('devices')

  for (const deviceConfig of devicesToLoad) {
    devices[deviceConfig.name] = {
      isConnected: false,
      api: initDevice(deviceConfig),
    }

    reconnect(devices[deviceConfig.name].api, deviceConfig.name)
  }
}

function initSubscription() {
  subscribe('tuyaPlugs/+/turnOn', (_msg: null, topic: string) => {
    const [, deviceName] = topic.split('/')

    if (!devices[deviceName]) {
      logger.log({
        level: 'error',
        message: `Can not turn on device ${deviceName}; Device is unknown`,
      })
      return
    }

    devices[deviceName].api
      .set({
        dps: '1',
        set: true,
      })
      .then(() => {
        logger.log({
          level: 'info',
          message: `Device ${deviceName} was turn on`,
        })

        publish(`tuyaPlugs/${deviceName}/status`, { isOn: true })
      })
      .catch(() => {
        logger.log({
          level: 'error',
          message: `Can not turn on device ${deviceName}`,
        })
      })
  })

  subscribe('tuyaPlugs/+/turnOff', (_msg: null, topic: string) => {
    const [, deviceName] = topic.split('/')

    if (!devices[deviceName]) {
      logger.log({
        level: 'error',
        message: `Can not turn off device ${deviceName}; Device is unknown`,
      })
      return
    }

    devices[deviceName].api
      .set({
        dps: '1',
        set: false,
      })
      .then(() => {
        logger.log({
          level: 'info',
          message: `Device ${deviceName} was turn off`,
        })

        publish(`tuyaPlugs/${deviceName}/status`, { isOn: false })
      })
      .catch(() => {
        logger.log({
          level: 'error',
          message: `Can not turn off device ${deviceName}`,
        })
      })
  })
}

initDevices()
initSubscription()
