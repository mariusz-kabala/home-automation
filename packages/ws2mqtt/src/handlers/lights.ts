import { fetchLights, ILightsResponse } from '../api'
import { IWSSensorMsg, ILight } from '../types'
import { publish } from '../clients/mqtt'

let lights: ILightsResponse = {}

fetchLights().then(response => (lights = response))

export function handleLightMsg(msg: IWSSensorMsg) {
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

  publish(`lights/${msg.id}`, data)
}
