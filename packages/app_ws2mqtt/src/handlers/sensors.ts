import { logger } from '@home/logger'
import { publish } from '@home/mqtt'
import { fetchSensors, fetchSensorDetails } from '@home/deconz-api'
import config from 'config'

import { IWSSensorMsg } from '../types'

function publishSensorsInfo() {
  fetchSensors()
    .then(response => {
      for (const id of Object.keys(response)) {
        publish(`${config.get<string>('namespace')}/sensors/${id}`, response[id], { retain: true, qos: 0 })
      }
    })
    .catch(err => {
      logger.log({
        level: 'error',
        message: `Can not fetch sensor info ${err}`,
      })
    })
}

function publishSensorDetails(id: string) {
  fetchSensorDetails(id).then(sensor =>
    publish(`${config.get<string>('namespace')}/sensors/${id}`, sensor, { retain: true, qos: 0 }),
  )
}

publishSensorsInfo()

const eventsMapper: { [key: string]: string } = {
  buttonevent: 'press',
  dark: 'isDark',
  daylight: 'isDaylight',
  presence: 'isPresence',
}

function publishEvents(id: string, state: { [key: string]: string | number }) {
  for (const field of Object.keys(eventsMapper)) {
    if (typeof state[field] !== 'undefined') {
      const event = eventsMapper[field]

      publish(`${config.get<string>('namespace')}/sensors/${id}/${event}`, state[field], { retain: true, qos: 0 })
    }
  }
}

export function handleSensorMsg(msg: IWSSensorMsg) {
  switch (msg.e) {
    case 'added':
      return publishSensorDetails(msg.id)

    case 'changed':
      publishSensorDetails(msg.id)
      if (msg.state) {
        return publishEvents(msg.id, msg.state)
      }
      break

    default:
      return logger.log({
        traceid: msg.uniqueid,
        level: 'error',
        message: `Not supported light message: ${JSON.stringify(msg)}`,
      })
  }
}
