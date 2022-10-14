import { Device } from './device'

export interface GangSwitch extends Device {
  state_l1: 'ON' | 'OFF'
  state_l2: 'ON' | 'OFF'
  state_l3: 'ON' | 'OFF'
  state_l4: 'ON' | 'OFF'
  state_l5: 'ON' | 'OFF'
}
