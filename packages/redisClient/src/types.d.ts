import * as redis from 'redis'

declare module 'redis' {
  export interface RedisClient extends NodeJS.EventEmitter {
    getAsync(key: string): Promise<string>
    getbitAsync(key: string, offset: number): Promise<number>
    getrangeAsync(key: string, start: number, end: number): Promise<string>
    getsetAsync(key: string, value: string): Promise<string>
    hdelAsync(key: string, fields: string[]): Promise<number>
    hexistsAsync(key: string, field: string): Promise<number>
    hgetAsync(key: string, field: string): Promise<string>
    hgetallAsync(key: string): Promise<{ [key: string]: string }>
    hmgetAsync(key: string, fields: string[]): Promise<string[]>
    hsetAsync(key: string, field: string, value: string): Promise<number>
    hsetnxAsync(key: string, field: string, value: string): Promise<number>
    setAsync(key: string, values: string): Promise<number>
    existsAsync(key: string): Promise<0|1>
    lpushAsync(key: string, ...values: string[] | number[] | boolean[]): Promise<number>
    lrangeAsync<T>(key: string, start: number, end: number): Promise<T>
    keysAsync(pattern: string): Promise<string[]>
    lremAsync(key: string, count: number, value: string|number|boolean): Promise<number>
  }
}
