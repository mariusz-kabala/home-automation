import { Resolver, Query, Arg, FieldResolver, Root } from 'type-graphql'
import { Service } from 'typedi'
import { ConsulNode } from 'types/consul/Node'
import { ConsulService } from 'types/consul/Service'
import { ConsulAPI, INodeDetailsAPIResponse } from 'sources/consulAPI'

const mapNodeServices = (response: INodeDetailsAPIResponse) => {
  return Object.keys(response.Services).map(service => ({
    id: response.Services[service].ID,
    node: response.Node.Node,
    address: response.Node.Address,
    datacenter: response.Node.Datacenter,
    serviceID: response.Services[service].ID,
    serviceName: response.Services[service].Service,
    serviceTags: response.Services[service].Tags,
    serviceAddress: response.Services[service].Address,
    servicePort: response.Services[service].Port,
  }))
}

@Service()
@Resolver(ConsulNode)
export class ConsulNodeResolver {
  constructor(private readonly api: ConsulAPI) {}

  @Query(() => ConsulNode)
  async node(@Arg('name') name: string): Promise<ConsulNode> {
    const response = await this.api.getNodeDetails(name)

    return {
      id: response.Node.ID,
      node: response.Node.Node,
      address: response.Node.Address,
      datacenter: response.Node.Datacenter,
      services: mapNodeServices(response),
    }
  }

  @Query(() => [ConsulNode])
  async nodes(): Promise<Partial<ConsulNode>[]> {
    const response = await this.api.getNodes()

    return response.map(node => ({
      id: node.ID,
      node: node.Node,
      address: node.Address,
    }))
  }

  @FieldResolver()
  async services(@Root() root: Partial<ConsulNode>): Promise<ConsulService[]> {
    const { node, services } = root

    if (Array.isArray(services)) {
        return services
    }

    const details = await this.api.getNodeDetails(node as string)

    return mapNodeServices(details)
  }
}
