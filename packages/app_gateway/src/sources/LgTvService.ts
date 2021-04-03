import { Service } from 'typedi'
import { ConsulService } from './consulService'

export interface ITvApiResponse {
  on: boolean
  volume?: number
  muted?: boolean
  app?: string
  channel?: number
}

@Service()
export class DeviceStatusService extends ConsulService {
  protected serviceName = 'lg2mqtt'

  // public devices(): Promise<{[name: string]: ITvApiResponse}>
}
