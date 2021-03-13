import { Resolver, Query, Arg } from 'type-graphql'
import { Service } from 'typedi'
import { Sensor } from 'types/Sensor'
import { DeCONZLightsAPI } from 'sources/deCONZ'
import { FindSensorsQuery } from 'types/input/FindSensorsQuery'

@Service()
@Resolver(Sensor)
export class SensorResolver {
  constructor(private readonly deCONZService: DeCONZLightsAPI) {}

  @Query(() => Sensor)
  sensor(@Arg('id') id: string): Promise<Sensor> {
    return this.deCONZService.getSensor(id)
  }

  @Query(() => [Sensor])
  sensors(): Promise<Sensor[]> {
    return this.deCONZService.getSensors()
  }

  @Query(() => [Sensor])
  findSensors(@Arg('query') query: FindSensorsQuery): Promise<Sensor[]> {
    console.log(query)
    return this.deCONZService.getSensors()
  }
}
