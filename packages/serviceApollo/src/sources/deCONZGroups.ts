import { RESTDataSource } from 'apollo-datasource-rest'
import config from 'config'

export class DeCONZGroupsAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = `http://${config.get<string>('apiHost')}/api/${config.get<string>('apiToken')}/`
  }

  public async getGroups() {
    const data = await this.get('groups')

    return Object.keys(data).map(id => ({
      id,
      ...data[id],
    }))
  }

  public async getGroup(id: string) {
    return await this.get(`groups/${id}`)
  }
}
