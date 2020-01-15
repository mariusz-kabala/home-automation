import { alertLevels } from '@home/commons'

// eq - is equal to
// ne - is not equal to
// gt - is greater than
// ge - is greater than or equal to
// lt - is less than
// le - is less than or equal to
export interface IRule {
    field: string
    condition: 'eq' | 'ne' | 'gt' | 'ge' | 'lt' | 'le'
    value: number
    level: alertLevels
    alert: string
    timeout: number
  }

export interface IWatchedDevice {
  level: alertLevels
  device: string
}
  