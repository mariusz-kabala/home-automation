import { Resolver, Query, Arg } from 'type-graphql'
import { Service } from 'typedi'
import { DeviceStatus } from 'types/DeviceStatus'
import { DeviceStatusService } from 'sources/DeviceStatusService'

@Service()
@Resolver(DeviceStatus)
export class DeviceDiscoveryResolver {
  constructor(private readonly service: DeviceStatusService) {}

  @Query(() => [DeviceStatus])
  devices(): Promise<DeviceStatus[]> {
    return this.service.devices()
  }

  @Query(() => DeviceStatus)
  device(@Arg('name') name: string) {
    return this.service.device(name)
  }

  @Query(() => [DeviceStatus])
  onlineDevices(): Promise<DeviceStatus[]> {
    return this.service.onlineDevices()
  }

  @Query(() => [DeviceStatus])
  offlineDevice(): Promise<DeviceStatus[]> {
    return this.service.offlineDevices()
  }
}
