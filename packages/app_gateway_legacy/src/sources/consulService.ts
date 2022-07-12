import { Inject } from 'typedi'
import { ConsulServices } from '@home/commons'
import fetch from 'node-fetch'
import { logger } from '@home/logger'

export abstract class ConsulService {
  protected serviceName: string

  constructor(@Inject('consulServices') private readonly consulServices: ConsulServices) {}

  protected getNode() {
    const node = this.consulServices.pickNode(this.serviceName)
    const url = `http://${node.ServiceAddress}:${node.ServicePort}`

    logger.info(`Picking a node for service: ${this.serviceName} - ${url}`)

    return url
  }

  public get<T>(url: string): Promise<T> {
    const node = this.getNode()

    logger.debug(`Making a GET request to ${node}/${url}`)

    return fetch(`${node}/${url}`).then(res => res.json())
  }

  public put<P, T = void>(url: string, payload: P): Promise<T> {
    const node = this.consulServices.pickNode(this.serviceName)

    return fetch(`${node}/${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(res => res.json())
  }

  public post<P, T = void>(url: string, payload: P): Promise<T> {
    const node = this.consulServices.pickNode(this.serviceName)

    return fetch(`${node}/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(res => res.json())
  }
}
