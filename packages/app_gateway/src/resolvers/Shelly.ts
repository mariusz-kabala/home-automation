import { Resolver, Query, Arg } from 'type-graphql'
import { Service } from 'typedi'
import { ShellyAPI, IFindShellyQuery, IShelliesResponse } from 'sources/Shelly'
import { Response } from 'types/Shelly/Response'
import { ShellyDevice } from 'types/Shelly/Device'
import { FindSensorsQuery } from 'types/input/FindShellyQuery'
import type { IShelly } from '@home/models'
import { ShellyCategory, ShellyType, Room } from '@home/models'

@Service()
@Resolver()
export class ShellyResolver {
  constructor(private readonly shellyService: ShellyAPI) {}

  @Query(() => Response)
  find(@Arg('query', () => FindSensorsQuery) query: IFindShellyQuery): Promise<IShelliesResponse> {
    return this.shellyService.find(query)
  }

  @Query(() => Response)
  room(@Arg('room', () => String) room: Room): Promise<IShelliesResponse> {
    return this.shellyService.room(room)
  }

  @Query(() => Response)
  category(@Arg('category', () => String) category: ShellyCategory): Promise<IShelliesResponse> {
    return this.shellyService.category(category)
  }

  @Query(() => Response)
  type(@Arg('type', () => String) type: ShellyType): Promise<IShelliesResponse> {
    return this.shellyService.type(type)
  }

  @Query(() => Response)
  async level(@Arg('level', () => Number) level: number): Promise<IShelliesResponse> {
    const response = await this.shellyService.level(level)
    return this.shellyService.level(level)
  }

  @Query(() => ShellyDevice)
  device(@Arg('id', () => String) id: string): Promise<IShelly> {
    return this.shellyService.device(id)
  }
}
