import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import { Service } from 'typedi'
import { Vacuum } from 'types/valetudo/Vacuum'
import { VacuumZone } from 'types/valetudo/Zone'
import { ValetudoAPI, IAttributeAPIResponse } from 'sources/ValetudoAPI'
import config from 'config'

function getVacuumStatus(attrs: IAttributeAPIResponse[]): Vacuum {
  const result: Partial<Vacuum> = {}

  for (const attr of attrs) {
    switch (attr.__class) {
      case 'StatusStateAttribute':
        result.status = attr.value as string
        break

      case 'BatteryStateAttribute':
        result.batteryLevel = attr.level as number
        result.batteryStatus = attr.flag
        break

      case 'IntensityStateAttribute':
        result.fanSpeed = attr.value as string
        break

      case 'ConsumableStateAttribute':
        if (attr.type === 'brush' && attr.subType === 'main') {
          result.mainBrushRemainingUsageTime = attr.remaining?.value
        } else if (attr.type === 'brush' && attr.subType === 'side_right') {
          result.rightBrushRemainingUsageTime = attr.remaining?.value
        } else if (attr.type === 'filter' && attr.subType === 'main') {
          result.mainFilterRemainingUsageTime = attr.remaining?.value
        } else if (attr.type === 'sensor' && attr.subType === 'all') {
          result.sensorRemainingUsageTime = attr.remaining?.value
        }
        break
    }
  }

  return result as Vacuum
}

@Service()
@Resolver()
export class ValetudoResolver {
  private devices: {
    [name: string]: ValetudoAPI
  } = {}

  constructor() {
    const valetudo = config.get<{ [name: string]: string }>('valetudo')

    for (const device of Object.keys(valetudo)) {
      this.devices[device] = new ValetudoAPI(valetudo[device])
    }
  }

  @Query(() => [String])
  vacuums(): string[] {
    return Object.keys(this.devices)
  }

  @Query(() => Vacuum)
  async vacuum(@Arg('name') name: string): Promise<Vacuum> {
    return getVacuumStatus(await this.devices[name].getAttributes())
  }

  @Query(() => [VacuumZone])
  async vacuumZones(@Arg('name') name: string): Promise<VacuumZone[]> {
    return this.devices[name].getZones()
  }

  @Mutation(() => Vacuum)
  async startCleanup(@Arg('name') name: string): Promise<Vacuum> {
    await this.devices[name].startCleanup()

    return getVacuumStatus(await this.devices[name].getAttributes())
  }

  @Mutation(() => Vacuum)
  async stopCleanup(@Arg('name') name: string): Promise<Vacuum> {
    await this.devices[name].stopCleanup()

    return getVacuumStatus(await this.devices[name].getAttributes())
  }

  @Mutation(() => Vacuum)
  async goHome(@Arg('name') name: string): Promise<Vacuum> {
    await this.devices[name].goHome()

    return getVacuumStatus(await this.devices[name].getAttributes())
  }

  @Mutation(() => Vacuum)
  async cleanZones(@Arg('name') name: string, @Arg('zones', () => [String]) zones: string[]): Promise<Vacuum> {
    await this.devices[name].cleanZones(zones)

    return getVacuumStatus(await this.devices[name].getAttributes())
  }
}
