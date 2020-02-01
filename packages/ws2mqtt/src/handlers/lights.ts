import { logger } from '@home/logger'
import { publish } from '@home/mqtt'
import { fetchLights, fetchLightDetails } from '@home/deconz-api'
import config from 'config'

import { IWSSensorMsg } from '../types'

function publishLightsInfo() {
  fetchLights()
    .then(response => {
      for (const id of Object.keys(response)) {
        publish(`${config.get<string>('namespace')}/lights/${id}`, response[id], { retain: true, qos: 0 })
      }
    })
    .catch(err => {
      logger.log({
        level: 'error',
        message: `Can not fetch lights info ${err}`,
      })
    })
}

publishLightsInfo()

export function handleLightMsg(msg: IWSSensorMsg) {
  switch (msg.e) {
    case 'changed':
    case 'added':
      return fetchLightDetails(msg.id)
        .then(light => publish(`${config.get<string>('namespace')}/lights/${msg.id}`, light, { retain: true, qos: 0 }))
        .catch(err => {
          console.log(err)
          logger.log({
            level: 'error',
            message: `Can not fetch light ${msg.id} info ${err}`,
          })
        })
    default:
      return logger.log({
        traceid: msg.uniqueid,
        level: 'error',
        message: `Not supported light message: ${JSON.stringify(msg)}`,
      })
  }
}
