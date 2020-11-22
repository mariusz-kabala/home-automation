import { DeCONZLightsAPI } from '../sources'

export interface Context {
  jwt?: string
  dataSources: {
    deCONZLights: DeCONZLightsAPI
  }
}
