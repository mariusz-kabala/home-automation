import { Service } from 'typedi'
import type { IShelly } from '@home/models'
import { ConnectionStatus, ShellyCategory, ShellyType, Room } from '@home/models'
import { API } from './API'
import { Response } from 'types/Shelly/Response'
import { FindSensorsQuery } from 'types/input/FindShellyQuery'

export interface IShelliesResponse {
    docs: IShelly[],
    total: number,
    limit: number
    offset: number
}

@Service()
export class ShellyAPI extends API {
  constructor() {
    super()
    this.baseURL = `https://home.kabala.tech/api/shelly`
  }

  public find(query: FindSensorsQuery): Promise<Response> {
    const searchParams = new URLSearchParams(query).toString()

    return this.get<Response>(`/search?${searchParams}`)
  }

  public room(room: Room): Promise<IShelliesResponse> {
    return this.get<IShelliesResponse>(`/room/${room}`)
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
