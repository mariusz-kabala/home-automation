import get from 'lodash.get'
import set from 'lodash.set'

export class Store<T = { [key: string]: any }> {
  private data: Partial<T> = {}

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

  public dump(): T {
    return this.data as T
  }

  public lastUpdate(key: string): Date | undefined {
    return this.updates[key]
  }
}
