import { Service } from 'typedi'
import { API } from './API'
import config from 'config'
import { LightState } from 'types/LightState'

@Service()
export class DeCONZLightsAPI extends API {
  constructor() {
    super()
    this.baseURL = `http://${config.get<string>('apiHost')}/api/${config.get<string>('apiToken')}/`
  }

  public async getLights() {
    const data = await this.get<any>('lights')

    return Object.keys(data)
      .map(id => ({
        id,
        ...data[id],
      }))
      .filter(light => light.modelid !== 'RaspBee')
  }

  public async getLight(id: string) {
    return await this.get<any>(`lights/${id}`)
  }

  public async getGroups() {
    const data = await this.get<any>('groups')

    return Object.keys(data).map(id => ({
      id,
      name: data[id].name,
      state: data[id].action,
      devices: data[id].lights,
    }))
  }

  public async updateLightState(id: string, state: LightState): Promise<any> {
    await this.put<LightState>(`lights/${id}/state`, state)

    return await this.get<any>(`lights/${id}`)
  }
}
