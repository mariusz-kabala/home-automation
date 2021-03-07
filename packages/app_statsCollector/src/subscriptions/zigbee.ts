import { subscribe } from '@home/mqtt'
import { logger } from '@home/logger'
import { Point } from '@influxdata/influxdb-client'

import { sensorsWriteApi, lightsWriteApi } from '../clients/db'

const SUPPORTED_TYPES = [
  'ZHALightLevel',
  'ZHATemperature',
  'ZHAPresence',
  'ZHASwitch',
  'ZHAHumidity',
  'ZHAPressure',
  'ZHAPower',
  'ZHAConsumption',
]

export function subscribeForZigbeeSensors() {
  subscribe(
    'zigbee/sensors/+',
    async (msg: {
      type: string
      state: { [key: string]: number | string | boolean }
      uniqueid: number
      name: string
      traceid: string
    }) => {
      const { type, state, uniqueid, name } = msg

      if (SUPPORTED_TYPES.includes(type) && state) {
        const point = new Point(type).tag('deviceId', `${uniqueid}`).tag('deviceName', name)

        for (const field of Object.keys(state)) {
          switch (typeof state[field]) {
            case 'string':
              point.stringField(field, state[field])
              break

            case 'number':
              point.intField(field, state[field])
              break

            case 'boolean':
              point.booleanField(field, state[field])
              break

            default:
              break
          }
        }

        sensorsWriteApi.writePoint(point)

        try {
          await sensorsWriteApi.flush()
        } catch (err) {
          logger.log({
            level: 'error',
            message: err,
          })
        }
      }
    },
  )
}

export function subscribeForZigbeeLights() {
  subscribe(
    'zigbee/lights/+',
    async (msg: {
      state: {
        on: boolean
        reachable: boolean
        bri?: number
        colormode?: string
        ct?: number
        hue?: number
        sat?: number
      }
      uniqueid: number
      name: string
      traceid: string
    }) => {
      const { state, uniqueid, name } = msg

      const point = new Point('light').tag('deviceId', `${uniqueid}`).tag('deviceName', name)

      point.booleanField('on', state.on)
      point.booleanField('reachable', state.reachable)

      if (typeof state.bri !== 'undefined') {
        point.intField('bri', state.bri)
      }

      if (typeof state.colormode !== 'undefined') {
        point.stringField('colormode', state.colormode)
      }

      if (typeof state.ct !== 'undefined') {
        point.intField('ct', state.ct)
      }

      if (typeof state.hue !== 'undefined') {
        point.intField('hue', state.hue)
      }

      if (typeof state.sat !== 'undefined') {
        point.intField('sat', state.sat)
      }

      lightsWriteApi.writePoint(point)

      try {
        await lightsWriteApi.flush()
      } catch (err) {
        logger.log({
          level: 'error',
          message: err,
        })
      }
    },
  )
}

export function subscribeForZigbeeGroups() {
  subscribe(
    'zigbee/groups/+',
    async (msg: {
      action: {
        on: boolean
        bri?: number
        colormode?: string
        ct?: number
        hue?: number
        sat?: number
      }
      name: string
      traceid: string
    }) => {
      const { action, name } = msg

      const point = new Point('group').tag('groupName', name)

      point.booleanField('on', action.on)

      if (typeof action.bri !== 'undefined') {
        point.intField('bri', action.bri)
      }

      if (typeof action.colormode !== 'undefined') {
        point.stringField('colormode', action.colormode)
      }

      if (typeof action.ct !== 'undefined') {
        point.intField('ct', action.ct)
      }

      if (typeof action.hue !== 'undefined') {
        point.intField('hue', action.hue)
      }

      if (typeof action.sat !== 'undefined') {
        point.intField('sat', action.sat)
      }

      lightsWriteApi.writePoint(point)

      try {
        await lightsWriteApi.flush()
      } catch (err) {
        logger.log({
          level: 'error',
          message: err,
        })
      }
    },
  )
}
