import { logger } from '@home/logger'
import { publish } from '@home/mqtt'

import { fetchSensors, ISensorsResponse } from '../api'
import { IWSSensorMsg, ISensor } from '../types'

let sensors: ISensorsResponse = {}

fetchSensors().then(response => (sensors = response))

export function handleSensorMsg(msg: IWSSensorMsg) {
  if (!sensors[msg.id]) {
    logger.log({
      traceid: msg.uniqueid,
      level: 'error',
      message: `Not supported sensor, WS message won't be publish ${JSON.stringify(msg)}`,
    })
    return
  }
  const sensor: ISensor = sensors[msg.id]
  const data = {
    id: msg.id,
    name: sensor.name,
    manufacturername: sensor.manufacturername,
    modelid: sensor.modelid,
    type: sensor.type,
    state: msg.state,
    traceid: msg.uniqueid,
  }

  publish(`sensors/${msg.id}`, data, { retain: true, qos: 0 })
}
