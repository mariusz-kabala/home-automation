import { Resolver, Query, Arg } from 'type-graphql'
import { Service } from 'typedi'
import { Sensor } from 'types/Sensor'
import { DeCONZLightsAPI } from 'sources/deCONZ'
import { FindSensorsQuery } from 'types/input/FindSensorsQuery'
import { isInRoom } from 'helpers/mappers'
import { Room } from 'enums/Rooms'

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
  async findSensors(@Arg('query', () => FindSensorsQuery) query: FindSensorsQuery): Promise<Sensor[]> {
    let sensors = await this.deCONZService.getSensors()

    if (query.room) {
      sensors = sensors.filter(sensor => isInRoom(sensor, query.room as Room, 'Sensor'))
    }

    if (query.type) {
      sensors = sensors.filter(sensor => sensor.type === query.type)
    }

    return sensors
  }
}
