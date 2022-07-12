import { Resolver, Query } from 'type-graphql'
import { Service } from 'typedi'
import { ConsulAPI } from 'sources/consulAPI'

@Service()
@Resolver()
export class ConsulDatacentersResolver {
  constructor(private readonly api: ConsulAPI) {}

  @Query(() => [String])
  datacenters(): Promise<string[]> {
    return this.api.getDatacenters()
  }


}
