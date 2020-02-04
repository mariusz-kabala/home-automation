import fetch, { RequestInit, Response } from 'node-fetch'
import config from 'config'
import { IGroupState, IGroup, ISensor, ILight } from './models'

interface IParams<T> {
  values: T
  headers?: {
    [key: string]: string
  }
}

const fetchJSON = <T, R>(url: string, params?: IParams<T>): Promise<R> => {
  const { values = {}, headers = {} } = params || {}
  const options: RequestInit & { timeout?: number } = {}

  if (values instanceof Object && Object.keys(values).length > 0) {
    headers['Content-Type'] = 'application/json'

    options.body = JSON.stringify(values)
    options.method = 'POST'
  }

  options.headers = headers

  options.timeout = 5000

  return fetch(url, options)
    .then((response: Response) => {
      if (response.ok) {
        return response.json()
      }

      throw response
    })
    .then((data: R) => data)
}

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
