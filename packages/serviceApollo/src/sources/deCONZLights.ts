import { RESTDataSource } from 'apollo-datasource-rest'
import config from 'config'

export class DeCONZLightsAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = `http://${config.get<string>('apiHost')}/api/${config.get<string>('apiToken')}/`
  }

  public async getLights() {
    const data = await this.get('lights')

    return Object.keys(data)
      .map(id => ({
        id,
        ...data[id],
      }))
      .filter(light => light.modelid !== 'RaspBee')
  }

  public async getLight(id: string) {
    return await this.get(`lights/${id}`)
  }
}
