export class Store {
  private data: { [key: string]: any } = {}

  private updates: { [key: string]: Date } = {}

  public set<T>(key: string, value: T): void {
    this.data[key] = value
    this.updates[key] = new Date()
  }

  public has(key: string): boolean {
    return typeof this.data[key] !== 'undefined'
  }

  public get<T>(key: string): T | undefined {
    return this.data[key]
  }

  public lastUpdate(key: string): Date | undefined {
    return this.updates[key]
  }
}
