import fetch, { RequestInit, Response } from 'node-fetch'

export interface IParams<T> {
  values: T
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

  options.timeout = 5000

  return fetch(url, options)
    .then((response: Response) => {
      if (response.ok) {
        return response.json()
      }

      throw response
    })
    .then(data => data as R)
}
