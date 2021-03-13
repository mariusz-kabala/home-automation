import { Service } from 'typedi'
import { API } from './API'
import config from 'config'
import { LightStateInput } from 'types/input/LightState'
import { LightGroupParams } from 'types/input/LightGroupParams'
import { LightsGroupStateInput } from 'types/input/LightsGroupState'
import { Light } from 'types/Light'
import { LightsGroup } from 'types/LightsGroup'
import { LightState } from 'types/LightState'
import { Sensor } from 'types/Sensor'

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
    const data = await this.get<Omit<Light, 'id'>>(`lights/${id}`)

    return {
      id,
      ...data,
    }
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
    const data = await this.get<Omit<LightsGroup, 'id'>>(`groups/${id}`)

    return {
      id,
      ...data,
    }
  }

  public async getSensors(): Promise<Sensor[]> {
    const data = await this.get<{ [id: string]: Omit<Sensor, 'id'> }>('sensors')

    return Object.keys(data).map(id => ({
      id,
      ...data[id],
    }))
  }

  public async getSensor(id: string): Promise<Sensor> {
    const data = await this.get<Omit<Sensor, 'id'>>(`sensors/${id}`)

    return {
      id,
      ...data,
    }
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
