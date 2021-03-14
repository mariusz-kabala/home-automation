export class RoundRobinEngine {
  private poolSize: number
  private currentIndex: number

  constructor(private pool: any[]) {
    this.poolSize = this.pool.length
    this.currentIndex = 0
  }

  public pick() {
    const pick = this.pool[this.currentIndex++]
    this.currentIndex = this.currentIndex % this.poolSize

    return pick
  }

  public updatePool(newPool: any[], compareFunc: (objOne: any, objTwo: any) => boolean) {
    mainLoop: for (const newPoolObj of newPool) {
      for (const poolObj of this.pool) {
        if (compareFunc(poolObj, newPoolObj)) {
          continue mainLoop
        }
      }

      this.pool.push(newPoolObj)
    }

    this.poolSize = this.pool.length
  }
}
