export interface IStatusResponse {
  wifi_sta: {
    connected: boolean
    ssid: string
    ip: string
    rssi: number
  }
  cloud: {
    connected: boolean
    enabled: boolean
  }
  mqtt: {
    connected: boolean
  }
  time: string // The current hour and minutes, in HH:MM format
  unixtime: number
  serial: number // Cloud serial number
  ram_free: number // Available amount of system memory in bytes
  ram_total: number // Total amount of system memory in bytes
  ram_lwm: number // Minimal watermark of the system free memory in bytes
  update: {
    status: 'idle' | 'pending' | 'updating' | 'unknown'
    has_update: boolean
    new_version: string
    old_version: string
  }
  fs_size: number // Total amount of the file system in bytes
  fs_free: number // Available amount of the file system in bytes
  uptime: number // Seconds elapsed since boot
  has_update: boolean
  temperature: number
  temperature_status: string
  tmp: {
    is_valid: boolean
    tC: number
    tF: number
  }
}
