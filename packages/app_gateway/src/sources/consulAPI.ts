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
  ServiceTags: string[]
  ServiceAddress: string
  ServicePort: number
}

export interface INodeAPIResponse {
  ID: string
  Node: string
  Address: string
  Datacenter: string
}

export interface INodeDetailsAPIResponse {
  Node: INodeAPIResponse
  Services: {
    [service: string]: {
      ID: string
      Service: string
      Tags: string[]
      Address: string
      Port: number
    }
  }
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

  public getNodes(): Promise<INodeAPIResponse[]> {
    return this.get<INodeAPIResponse[]>('catalog/nodes')
  }

  public getServiceDetails(serviceName: string): Promise<IServiceDetailsAPIResponse> {
    return this.get<[IServiceDetailsAPIResponse]>(`catalog/service/${serviceName}`).then(res => res[0])
  }

  public getNodeDetails(nodeName: string): Promise<INodeDetailsAPIResponse> {
    return this.get<INodeDetailsAPIResponse>(`catalog/node/${nodeName}`)
  }

  public getDatacenters(): Promise<string[]> {
    return this.get<string[]>('catalog/datacenters')
  }
}
