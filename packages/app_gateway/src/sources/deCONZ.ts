import { Service } from 'typedi'
import { API } from './API'
import config from 'config'
import { LightStateInput } from 'types/input/LightState'
import { LightGroupParams } from 'types/input/LightGroupParams'
import { LightsGroupStateInput } from 'types/input/LightsGroupState'
import { Light } from 'types/Light'
import { LightsGroup } from 'types/LightsGroup'
import { LightState } from 'types/LightState'

@Service()
export class DeCONZLightsAPI extends API {
  constructor() {
    super()
    this.baseURL = `http://${config.get<string>('apiHost')}/api/${config.get<string>('apiToken')}/`
  }

  public async getLights(): Promise<Light[]> {
    const data = await this.get<{ [id: string]: Omit<Light, 'id'> }>('lights')

    return Object.keys(data)
      .map(id => ({
        id,
        ...data[id],
      }))
      .filter(light => light.modelid !== 'RaspBee')
  }

  public async getLight(id: string): Promise<Light> {
    return await this.get<Light>(`lights/${id}`)
  }

  public async getGroups(): Promise<Partial<LightsGroup> & { devices: string[] }[]> {
    const data = await this.get<{
      [id: string]: {
        name: string
        action: LightState
        lights: string[]
      }
    }>('groups')

    return Object.keys(data).map(id => ({
      id,
      name: data[id].name,
      state: data[id].action,
      devices: data[id].lights,
    }))
  }

  public async getGroup(id: string): Promise<LightsGroup> {
    return this.get<LightsGroup>(`groups/${id}`)
  }

  public async updateLightState(id: string, state: LightStateInput): Promise<Light> {
    await this.put<LightStateInput>(`lights/${id}/state`, state)

    return this.getLight(id)
  }

  public async updateLightParams(id: string, params: { name: string }): Promise<Light> {
    await this.put<{ name: string }>(`lights/${id}`, params)

    return this.getLight(id)
  }

  public async updateGroupParams(id: string, params: LightGroupParams): Promise<LightsGroup> {
    await this.put<LightGroupParams>(`groups/${id}`, params)

    return this.getGroup(id)
  }

  public async updateGroupState(id: string, state: LightsGroupStateInput): Promise<LightsGroup> {
    await this.put<LightsGroupStateInput>(`groups/${id}`, state)

    return this.getGroup(id)
  }
}
