import { Inject } from 'typedi'
import { ConsulServices } from '@home/commons'
import fetch from 'node-fetch'

export abstract class ConsulService {
  protected serviceName = 'pollutionReports'

  constructor(@Inject('consulServices') private readonly consulServices: ConsulServices) {}

  protected getNode() {
    const node = this.consulServices.pickNode(this.serviceName)

    return `http://${node.ServiceAddress}:${node.ServicePort}`
  }

  public get<T>(url: string): Promise<T> {
    const node = this.getNode()

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
