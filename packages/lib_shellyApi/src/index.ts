import { fetchJSON } from '@home/commons'

export const fetchStatus = (deviceIp: string) => fetchJSON(`${deviceIp}/status`)