import { fetchJSON } from '@home/commons'
import { IFetchClientsResponse } from './models'
import config from 'config'

const API_URL = `https://${config.get<string>('emqxUrl')}/api/v5`

export function fetchClients() {
  return fetchJSON<{}, IFetchClientsResponse>(`${API_URL}/clients?page=1&limit=1000`, {
    values: {},
    headers: {
      Authorization: `Basic ${Buffer.from(
        config.get<string>('emqxApiKey') + ':' + config.get<string>('emqxSecurityKey'),
      ).toString('base64')}`,
    },
  })
}

export * from './models'
