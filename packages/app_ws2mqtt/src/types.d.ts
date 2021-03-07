export interface IWSBaseMsg {
  e: string
  id: string
  r: string
  t: string
  uniqueid: string
}

export interface IWSSensorMsg extends IWSBaseMsg {
  state: {
    [key: string]: string | number
  }
}

export interface IWSGroupMsg extends IWSBaseMsg {
  e: string,
  id: string ,
  r: string,
  state:{
    all_on: boolean,
    any_on: boolean
  },
  t: string
}
