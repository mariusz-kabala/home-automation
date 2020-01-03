import { fetchSensors, ISensorsResponse } from '../api'
import { IWSSensorMsg, ISensor } from '../types'
import { publish } from '../clients/mqtt'

let sensors: ISensorsResponse = {}

fetchSensors().then(response => (sensors = response))

export function handleSensorMsg(msg: IWSSensorMsg) {
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

  publish(`sensors/${msg.id}`, data)
}
