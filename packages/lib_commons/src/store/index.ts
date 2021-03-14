import get from 'lodash.get'
import set from 'lodash.set'

export class Store {
  private data: { [key: string]: any } = {}

  private updates: { [key: string]: Date } = {}

  public set<T>(key: string, value: T): void {
    set(this.data, key, value)
    this.updates[key] = new Date()
  }

  public has(key: string): boolean {
    return typeof get(this.data, key, undefined) !== 'undefined'
  }

  public get<T>(key: string): T | undefined {
    return get(this.data, key, undefined)
  }

  public lastUpdate(key: string): Date | undefined {
    return this.updates[key]
  }
}
