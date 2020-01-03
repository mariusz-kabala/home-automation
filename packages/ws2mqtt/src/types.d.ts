export interface IWSSensorMsg {
  e: string
  state: {
    [key: string]: string | number
  }
  id: string
  r: string
  t: string
  uniqueid: string
}

export interface ISensor {
  config: {
    [key: string]: boolean | number | string
  }
  ep?: number
  etag: string
  manufacturername: string
  mode?: string
  modelid: string
  name: string
  state: {
    [key: string]: boolean | number | string
  }
  swversion: string
  type: string
  uniqueid: string
}

export interface ILight {
    ctmax: number
    ctmin: number
    etag: string
    hascolor: boolean
    manufacturername: string
    modelid: string
    name: string
    state: {
        [key: string]: number|string|boolean|number[]
    },
    swversion: string
    type: string
    uniqueid: string
}