import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import { Service } from 'typedi'
import { ShellyAPI } from 'sources/Shelly'
import { Response } from 'types/Shelly/Response'
import { FindSensorsQuery } from 'types/input/FindShellyQuery'

@Service()
@Resolver()
export class ShellyResolver {
  constructor(private readonly shellyService: ShellyAPI) {}

  @Query(() => Response)
  find(@Arg('query', () => FindSensorsQuery) query): Promise<Response> {
    return this.shellyService.find(query)
  }
}
