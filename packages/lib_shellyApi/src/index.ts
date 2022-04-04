import { fetchJSONWithTimeout } from '@home/commons'
import { IStatusResponse } from './models/statusResponse'
import { URLSearchParams } from 'url'

export const fetchStatus = <T = IStatusResponse>(deviceIp: string) =>
  fetchJSONWithTimeout<void, T>(`http://${deviceIp}/status`, { timeout: 1500 })

export const turnRelay = (deviceIp: string, relay: string, action: 'on' | 'off') =>
  fetchJSONWithTimeout<void, unknown>(`http://${deviceIp}/relay/${relay}?turn=${action}`, { timeout: 1000 })

export const moveRoller = (
  deviceIp: string,
  roller: number,
  params: { go: 'open' | 'stop' | 'close' | 'to_pos'; roller_pos?: string },
) => {
  const query = new URLSearchParams(params)

  fetchJSONWithTimeout<void, unknown>(`http://${deviceIp}/roller/${roller}?${query.toString()}`, { timeout: 1000 })
}

export const updateFirmware = (deviceIp: string) =>
  fetchJSONWithTimeout<void, unknown>(`http://${deviceIp}/ota?update=1`, { timeout: 1000 })
