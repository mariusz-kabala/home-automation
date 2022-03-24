import { fetchJSONWithTimeout } from '@home/commons'
import { IStatusResponse } from './models/statusResponse'

export const fetchStatus = <T = IStatusResponse>(deviceIp: string) =>
  fetchJSONWithTimeout<void, T>(`http://${deviceIp}/status`, { timeout: 1500 })
