import { Device } from './device'

export interface Plug extends Device {
  state: 'ON' | 'OFF'
}
