import { fetchJSON } from '@home/commons'
import fetch, { RequestInit } from 'node-fetch'
import config from 'config'

import { IGroupState, IGroup, ISensor, ILight } from './models'

const API_URL = `http://${config.get<string>('apiHost')}/api/${config.get<string>('apiToken')}`

export const setGroupState = (groupId: string, state: IGroupState) => {
  const options: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(state),
    method: 'PUT',
  }

  return fetch(`${API_URL}/groups/${groupId}/action`, options)
}

export const fetchGroups = () => fetchJSON<void, { [groupId: string]: IGroup }>(`${API_URL}/groups`)

export const fetchGroupDetails = (id: string) => fetchJSON<void, IGroup>(`${API_URL}/groups/${id}`)

export const fetchSensors = () => fetchJSON<void, { [sensorId: string]: ISensor }>(`${API_URL}/sensors`)

export const fetchSensorDetails = (id: string) => fetchJSON<void, ISensor>(`${API_URL}/sensors/${id}`)

export const fetchLights = () => fetchJSON<void, { [lightId: string]: ILight }>(`${API_URL}/lights`)

export const fetchLightDetails = (id: string) => fetchJSON<void, ILight>(`${API_URL}/lights/${id}`)

export * from './models'
