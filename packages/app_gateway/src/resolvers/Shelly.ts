import { Resolver, Query, Arg } from 'type-graphql'
import { Service } from 'typedi'
import { ShellyAPI, IFindShellyQuery, IShelliesResponse } from 'sources/Shelly'
import { ShellyResponse } from 'types/Shelly/Response'
import { ShellyDevice } from 'types/Shelly/Device'
import { FindSensorsQuery } from 'types/input/FindShellyQuery'
import type { IShelly } from '@home/models'
import { ShellyCategory, ShellyType, Room } from '@home/models'

@Service()
@Resolver()
export class ShellyResolver {
  constructor(private readonly shellyService: ShellyAPI) {}

  @Query(() => ShellyResponse)
  findShelly(@Arg('query', () => FindSensorsQuery) query: IFindShellyQuery): Promise<IShelliesResponse> {
    return this.shellyService.find(query)
  }

  @Query(() => ShellyResponse)
  shellyByRoom(@Arg('room', () => String) room: Room): Promise<IShelliesResponse> {
    return this.shellyService.room(room)
  }

  @Query(() => ShellyResponse)
  shellyByCategory(@Arg('category', () => String) category: ShellyCategory): Promise<IShelliesResponse> {
    return this.shellyService.category(category)
  }

  @Query(() => ShellyResponse)
  shellyByType(@Arg('type', () => String) type: ShellyType): Promise<IShelliesResponse> {
    return this.shellyService.type(type)
  }

  @Query(() => ShellyResponse)
  async shellyByLevel(@Arg('level', () => Number) level: number): Promise<IShelliesResponse> {
    return this.shellyService.level(level)
  }

  @Query(() => ShellyDevice)
  shellyDevice(@Arg('id', () => String) id: string): Promise<IShelly> {
    return this.shellyService.device(id)
  }
}
