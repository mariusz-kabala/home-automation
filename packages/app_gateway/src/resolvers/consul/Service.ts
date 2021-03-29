import { Resolver, Query, Arg } from 'type-graphql'
import { Service } from 'typedi'
import { ConsulService } from 'types/consul/Service'
import { ConsulAPI, IServiceDetailsAPIResponse } from 'sources/consulAPI'

const mapServiceResponse = (response: IServiceDetailsAPIResponse) => ({
  id: response.ID,
  node: response.Node,
  address: response.Address,
  datacenter: response.Datacenter,
  serviceID: response.ServiceID,
  serviceName: response.ServiceName,
  serviceAddress: response.ServiceAddress,
  servicePort: response.ServicePort,
  serviceTags: response.ServiceTags,
})

const hasTags = (tagsList: string[], tagsToFind: string[]) => {
  for (const tag of tagsToFind) {
    if (tagsList.includes(tag)) {
      return true
    }
  }

  return false
}

@Service()
@Resolver(ConsulService)
export class ConsulServiceResolver {
  constructor(private readonly api: ConsulAPI) {}

  @Query(() => ConsulService)
  async service(@Arg('name') name: string): Promise<ConsulService> {
    return mapServiceResponse(await this.api.getServiceDetails(name))
  }

  @Query(() => [ConsulService])
  async services(): Promise<ConsulService[]> {
    const response = await this.api.getServices()

    return Promise.all(Object.keys(response).map(service => this.api.getServiceDetails(service))).then(services =>
      services.map(mapServiceResponse),
    )
  }

  @Query(() => [ConsulService])
  async servicesByTag(@Arg('tags', () => [String]) tags: string[]): Promise<ConsulService[]> {
    const response = await this.api.getServices()

    return Promise.all(
      Object.keys(response)
        .filter(service => hasTags(response[service], tags))
        .map(service => this.api.getServiceDetails(service)),
    ).then(services => services.map(mapServiceResponse))
  }
}
