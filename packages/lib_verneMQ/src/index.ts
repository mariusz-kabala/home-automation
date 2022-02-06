import { fetchJSON } from '@home/commons'
import { IFetchSessionsResponse } from './models'
import config from 'config'

const API_URL = `https://${config.get<string>('verneMQApiKey')}@${config.get<string>('verneMQUrl')}/api/v1`

export function fetchSessions() {
  return fetchJSON<void, IFetchSessionsResponse>(`${API_URL}/session/show`)
}

export * from './models'
