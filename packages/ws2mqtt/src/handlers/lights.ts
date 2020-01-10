import { logger } from '@home/logger'
import { publish } from '@home/mqtt'

import { fetchLights, ILightsResponse } from '../api'
import { IWSSensorMsg, ILight } from '../types'

let lights: ILightsResponse = {}

fetchLights().then(response => (lights = response))

export function handleLightMsg(msg: IWSSensorMsg) {
  if (!lights[msg.id]) {
    logger.log({
      traceid: msg.uniqueid,
      level: 'error',
      message: `Not supported light, WS message won't be publish ${JSON.stringify(msg)}`,
    })
    return
  }
  const light: ILight = lights[msg.id]
  const data = {
    id: msg.id,
    hascolor: light.hascolor,
    name: light.name,
    manufacturername: light.manufacturername,
    modelid: light.modelid,
    type: light.type,
    state: msg.state,
    traceid: msg.uniqueid,
  }

  publish(`lights/${msg.id}`, data, { retain: true, qos: 0 })
}
