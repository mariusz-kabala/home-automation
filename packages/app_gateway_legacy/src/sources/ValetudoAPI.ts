import { Service } from 'typedi'
import { API } from './API'

export interface IAttributeAPIResponse {
  __class: string
  metaData: {
    [key: string]: string
  }
  value?: string | number
  level?: number
  flag?: string
  type?: string
  subType?: string
  remaining?: {
    value: number
    unit: string
  }
}

export interface IZoneAPIResponse {
  name: string
  id: string
  areas: number[][]
}

export interface IActionPayload {
  action: 'start' | 'stop' | 'home'
}

export interface ICleanZonesPayload {
  action: 'clean'
  ids: string[]
}

@Service()
export class ValetudoAPI extends API {
  constructor(ipAddress: string) {
    super()
    this.baseURL = `http://${ipAddress}/api/v2/robot/`
  }

  public getAttributes(): Promise<IAttributeAPIResponse[]> {
    return this.get<IAttributeAPIResponse[]>('state/attributes')
  }

  public getZones(): Promise<IZoneAPIResponse[]> {
    return this.get<IZoneAPIResponse[]>('capabilities/ZoneCleaningCapability/presets_legacy')
  }

  public startCleanup(): Promise<void> {
    return this.put<IActionPayload>('capabilities/BasicControlCapability', {
      action: 'start',
    }).catch(() => undefined)
  }

  public stopCleanup(): Promise<void> {
    return this.put<IActionPayload>('capabilities/BasicControlCapability', {
      action: 'stop',
    }).catch(() => undefined)
  }

  public goHome(): Promise<void> {
    return this.put<IActionPayload>('capabilities/BasicControlCapability', {
      action: 'home',
    }).catch(() => undefined)
  }

  public cleanZones(zoneIds: string[]): Promise<void> {
    return this.put<ICleanZonesPayload>('capabilities/ZoneCleaningCapability/presets', {
      action: 'clean',
      ids: zoneIds,
    }).catch(() => undefined)
  }
}
