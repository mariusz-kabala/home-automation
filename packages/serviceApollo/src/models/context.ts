import { DeCONZLightsAPI, DeCONZGroupsAPI } from '../sources'

export interface Context {
  jwt?: string
  dataSources: {
    deCONZLights: DeCONZLightsAPI
    deCONZGroups: DeCONZGroupsAPI
  }
}
