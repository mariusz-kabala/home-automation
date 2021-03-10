import { Service } from 'typedi'
import { API } from './API'
import config from 'config'

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
}
