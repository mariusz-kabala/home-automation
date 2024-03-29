import { Service } from 'typedi'
import type { IShelly } from '@home/models'
import { ConnectionStatus, ShellyCategory, ShellyType, Room } from '@home/models'
import { API } from './API'

export interface IShelliesResponse {
    docs: IShelly[],
    total: number,
    limit: number
    offset: number
}

export interface IFindShellyQuery {
  level?: string
  category?: ShellyCategory
  room?: Room
  type?: ShellyType
  mqttStatus?: ConnectionStatus
  httpStatus?: ConnectionStatus
}

@Service()
export class ShellyAPI extends API {
  constructor() {
    super()
    this.baseURL = `https://home.kabala.tech/api/shelly`
  }

  public find(query: IFindShellyQuery): Promise<IShelliesResponse> {
    const searchParams = new URLSearchParams(query as Record<string, string>).toString()

    return this.get<IShelliesResponse>(`/search?${searchParams}`)
  }

  public room(room: Room): Promise<IShelliesResponse> {
    return this.get<IShelliesResponse>(`/rooms/${room}`)
  }

  public category(category: ShellyCategory): Promise<IShelliesResponse> {
    return this.get<IShelliesResponse>(`/categories/${category}`)
  }

  public type(type: ShellyType): Promise<IShelliesResponse> {
    return this.get<IShelliesResponse>(`/types/${type}`)
  }

  public level(level: number): Promise<IShelliesResponse> {
    return this.get<IShelliesResponse>(`/level/${level}`)
  }

  public device(id: string): Promise<IShelly> {
    return this.get<IShelly>(`/devices/${id}`)
  }
}
