import { RESTDataSource } from 'apollo-datasource-rest'

export class DeCONZLightsAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://192.168.0.34/api/C1CC8C3DCC/'
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
