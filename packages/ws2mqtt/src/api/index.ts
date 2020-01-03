import fetch, { RequestInit, Response } from 'node-fetch'
import config from 'config'
import { ISensor, ILight } from '../types'

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

const API_URL = `http://${config.get<string>('wsHost')}/api/${config.get<string>('apiToken')}`

export interface ISensorsResponse {
  [key: string]: ISensor
}

export const fetchSensors = () => fetchJSON<void, ISensorsResponse>(`${API_URL}/sensors`)

export interface ILightsResponse {
  [key: string]: ILight
}

export const fetchLights = () => fetchJSON<void, ILightsResponse>(`${API_URL}/lights`)
