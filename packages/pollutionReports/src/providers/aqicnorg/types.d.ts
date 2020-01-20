export interface IAqicnorgResponse {
  status: string
  data: {
    aqi: number
    idx: number
    attributions: {
      url?: string
      name: string
      logo?: string
    }[]
    city: {
      geo: number[]
      name: string
      url: string
    }
    dominentpol: string
    iaqi: {
      co: {
        v: number
      }
      no2: {
        v: number
      }
      pm25: {
        v: number
      }
      so2: {
        v: number
      }
      t: {
        v: number
      }
    }
    time: {
      s: string
      tz: string
      v: 1579518000
    }
    debug: {
      sync: string
    }
  }
}
