import { consul } from './consul'
import { logger } from '@home/logger'
import { RoundRobinEngine } from '../RoundRobinEngine'

export interface INode {
  Node: string
  Address: string
  ServiceID: string
  ServiceAddress: string
  ServiceName: string
  ServiceTags: string[]
  ServicePort: number
}

export class ConsulServices {
  private services: {
    [service: string]: RoundRobinEngine | null
  }

  constructor(private servicesList: string[] = []) {
    this.services = servicesList.reduce((all: { [service: string]: null }, service) => {
      all[service] = null

      return all
    }, {})

    servicesList.length > 0 && this.initWatchers()
  }

  public compareNodes(nodeOne: INode, nodeTwo: INode) {
    return nodeOne.ServiceID === nodeTwo.ServiceID
  }

  public fetchAllNodes = () => {
    return Promise.all(this.servicesList.map(service => this.fetchNodes(service)))
      .then(nodes => {
        this.servicesList.forEach((service, index) => {
          if (this.services[service] === null) {
            this.services[service] = new RoundRobinEngine(nodes[index] as INode[])
          } else {
            ;(this.services[service] as RoundRobinEngine).updatePool(nodes[index] as INode[], this.compareNodes)
          }
        })
      })
      .catch(() => {
        // ignore
      })
  }

  public pickNode = (service: string): INode => {
    if (!this.hasService(service)) {
      throw new Error(`Service ${service} has no nodes`)
    }
    return (this.services[service] as RoundRobinEngine).pick()
  }

  public hasService = (service: string): boolean => {
    return this.services[service] instanceof RoundRobinEngine
  }

  public addService = (service: string) => {
    if (this.hasService(service)) {
      return Promise.resolve()
    }

    return this.fetchNodes(service, true).then(() => {
      this.initWatch(service)
    })
  }

  private fetchNodes = (service: string, update = false) => {
    return new Promise((resolve, reject) => {
      consul.catalog.service.nodes(
        {
          service,
        },
        (err, result) => {
          if (err) {
            logger.log({
              level: 'error',
              message: `Can not fetch list of nodes for service ${service}: ${err}`,
            })

            return reject(err)
          }

          if (update) {
            this.services[service] = new RoundRobinEngine(result as INode[])
          }
          resolve(result)
        },
      )
    })
  }

  private initWatch = (service: string) => {
    const watch = consul.watch({
      method: consul.catalog.service.nodes,
      options: { service } as any, // TS typings are wrong
      backoffFactor: 1000,
    })

    watch.on('change', data => {
      logger.log({
        level: 'info',
        message: `Got a new data from consul about ${service} service, nodes: ${data.length}`,
      })
      this.services[service] = new RoundRobinEngine(data)
    })

    watch.on('error', () => null)
  }

  private initWatchers = () => {
    this.servicesList.forEach(this.initWatch)
  }
}
