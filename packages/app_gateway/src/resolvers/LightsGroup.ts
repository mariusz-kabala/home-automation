import { Resolver, Query, FieldResolver, Root } from 'type-graphql'
import { Service } from 'typedi'
import { LightsGroup } from 'types/LightsGroup'
import { Light } from 'types/Light'
import { DeCONZLightsAPI } from 'sources/deCONZ'

@Service()
@Resolver(LightsGroup)
export class LightsGroupResolver {
  constructor(private readonly deCONZService: DeCONZLightsAPI) {}

  @Query(() => [LightsGroup])
  lightsGroups(): Promise<LightsGroup[]> {
    return this.deCONZService.getGroups()
  }

  @FieldResolver()
  devices(@Root() group: LightsGroup): Promise<Light[]> {
    return Promise.all(group.devices.map(id => this.deCONZService.getLight((id as unknown) as string))).then(res => {
      return res.map((light, index) => ({
        id: group.devices[index],
        ...light,
      }))
    })
  }
}
