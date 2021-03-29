import { Service } from 'typedi'
import { API } from './API'
import config from 'config'

export interface IServicesAPIResponse {
  [name: string]: string[]
}

export interface IServiceDetailsAPIResponse {
  ID: string
  Node: string
  Address: string
  Datacenter: string
  ServiceID: string
  ServiceName: string
  ServiceTags: string
  ServiceAddress: string
  ServicePort: string
}

export interface INodesAPIResponse {
    
}

@Service()
export class ConsulAPI extends API {
  constructor() {
    super()
    this.baseURL = `http://${config.get<string>('consulHost')}:${config.get<string>('consulPort')}/v1/`
  }

  public getServices(): Promise<IServicesAPIResponse> {
    return this.get<IServicesAPIResponse>('catalog/services')
  }

  public getNodes()

  public getServiceDetails(serviceName: string): Promise<IServiceDetailsAPIResponse> {
    return this.get<IServiceDetailsAPIResponse>(`catalog/service/${serviceName}`)
  }
}
