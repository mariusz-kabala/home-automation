import fetch, { RequestInit, Response } from 'node-fetch'
import { AbortSignal } from 'node-fetch/externals'

export interface IParams<T> {
  values?: T
  signal?: AbortSignal
  headers?: {
    [key: string]: string
  }
}

export const fetchJSON = <T, R>(url: string, params?: IParams<T>): Promise<R> => {
  const { values = {}, headers = {} } = params || {}
  const options: RequestInit & { timeout?: number } = {}

  if (values instanceof Object && Object.keys(values).length > 0) {
    headers['Content-Type'] = 'application/json'

    options.body = JSON.stringify(values)
    options.method = 'POST'
  }

  options.headers = headers

  if (params?.signal) {
    options.signal = params.signal
  }

  return fetch(url, options)
    .then((response: Response) => {
      if (response.ok) {
        return response.json()
      }

      throw response
    })
    .then(data => data as R)
}

export interface IWithTimeoutParams<T> extends IParams<T> {
  timeout?: number
}

export const fetchJSONWithTimeout = async <T, R>(url: string, params?: IWithTimeoutParams<T>): Promise<R> => {
  const controller = new AbortController()
  const timeout = params?.timeout || 5000
  const id = setTimeout(() => controller.abort(), timeout)

  if (!params) {
    params = {
      signal: controller.signal as AbortSignal,
      values: {} as T,
    }
  } else {
    params.signal = controller.signal as AbortSignal
  }

  const response: R = await fetchJSON(url, params)
  clearTimeout(id)

  return response
}
