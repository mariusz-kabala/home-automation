import { fetchJSON } from '@home/commons'
import { IFetchSessionsResponse } from './models'
import config from 'config'

const API_URL = `https://${config.get<string>('verneMQUrl')}/api/v1`

export function fetchSessions() {
  return fetchJSON<{}, IFetchSessionsResponse>(`${API_URL}/session/show`, {
    values: {},
    headers: {
      Authorization: `Basic ${btoa(config.get<string>('verneMQApiKey') + ':')}`,
    },
  })
}

export * from './models'
