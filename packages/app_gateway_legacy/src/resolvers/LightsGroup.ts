import { Resolver, Query, FieldResolver, Root, Mutation, Arg } from 'type-graphql'
import { Service } from 'typedi'
import { LightsGroup } from 'types/LightsGroup'
import { LightGroupParams } from 'types/input/LightGroupParams'
import { LightsGroupStateInput } from 'types/input/LightsGroupState'
import { Light } from 'types/Light'
import { DeCONZLightsAPI } from 'sources/deCONZ'

@Service()
@Resolver(LightsGroup)
export class LightsGroupResolver {
  constructor(private readonly deCONZService: DeCONZLightsAPI) {}

  @Query(() => [LightsGroup])
  lightsGroups() {
    return this.deCONZService.getGroups()
  }

  @FieldResolver()
  devices(@Root() group: LightsGroup) {
    return Promise.all(group.devices.map(id => this.deCONZService.getLight((id as unknown) as string))).then(res => {
      return res.map((light: Partial<Light>, index: number) => ({
        id: group.devices[index],
        ...light,
      }))
    })
  }

  @Mutation(() => LightsGroup)
  setLightsGroupParams(@Arg('id') id: string, @Arg('state') params: LightGroupParams): Promise<LightsGroup> {
    return this.deCONZService.updateGroupParams(id, params)
  }

  @Mutation(() => LightsGroup)
  setLightsGroupState(@Arg('id') id: string, @Arg('state') state: LightsGroupStateInput): Promise<LightsGroup> {
    return this.deCONZService.updateGroupState(id, state)
  }
}
