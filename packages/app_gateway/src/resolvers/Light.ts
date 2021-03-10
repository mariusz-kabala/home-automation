import { Resolver, Query, Arg } from 'type-graphql'
import { Service } from 'typedi'
import { Light } from 'types/Light'
import { DeCONZLightsAPI } from 'sources/deCONZ'

@Service()
@Resolver(Light)
export class LightResolver {
  constructor(private readonly deCONZService: DeCONZLightsAPI) {}

  @Query(() => Light)
  light(@Arg('id') id: string): Promise<Light> {
    return this.deCONZService.getLight(id)
  }

  @Query(() => [Light])
  lights(): Promise<Light[]> {
    return this.deCONZService.getLights()
  }
}
