import { Device } from './device'

export interface ZigbeeLight extends Device {
  brightness: number
  state: 'OFF' | 'ON'
  color?: {
    hue: number
    saturation: number
    x: number
    y: number
  }
  color_mode: string
  color_temp: number
}
