import { Service } from 'typedi'
import { ConsulService } from './consulService'

export interface IDeviceStatusAPIResponse {
  name: string
  address: string
  status: boolean
  port?: number
  mac?: string
}

@Service()
export class DeviceStatusService extends ConsulService {
  protected serviceName = 'deviceDiscovery'

  public devices(): Promise<IDeviceStatusAPIResponse[]> {
    return this.get<IDeviceStatusAPIResponse[]>('devices')
  }

  public onlineDevices(): Promise<IDeviceStatusAPIResponse[]> {
    return this.get<IDeviceStatusAPIResponse[]>('devices?online=1')
  }

  public offlineDevices(): Promise<IDeviceStatusAPIResponse[]> {
    return this.get<IDeviceStatusAPIResponse[]>('devices?online=1')
  }

  public device(name: string): Promise<IDeviceStatusAPIResponse> {
    return this.get<IDeviceStatusAPIResponse>(`devices/${name}`)
  }
}
