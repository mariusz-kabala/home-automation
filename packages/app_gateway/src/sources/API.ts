import fetch from 'node-fetch'

export class API {
  protected baseURL: string

  public get<T>(url: string): Promise<T> {
    return fetch(`${this.baseURL}${url}`).then(res => res.json())
  }
}
