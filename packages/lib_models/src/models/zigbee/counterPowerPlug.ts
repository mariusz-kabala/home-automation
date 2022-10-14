import { Device } from './device'

export interface CounterPowerPlug extends Device {
  current: number
  energy: number
  power: number
  power_outage_memory: 'restore' | 'on' | 'off'
  state: 'ON' | 'OFF'
  voltage: number
}
