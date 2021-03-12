import fetch from 'node-fetch'

export class API {
  protected baseURL: string

  public get<T>(url: string): Promise<T> {
    return fetch(`${this.baseURL}${url}`).then(res => res.json())
  }

  public put<P, T = void>(url: string, payload: P): Promise<T> {
    return fetch(`${this.baseURL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(res => res.json())
  }

  public post<P, T = void>(url: string, payload: P): Promise<T> {
    return fetch(`${this.baseURL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(res => res.json())
  }
}
