export interface IClient {
  connected: boolean
  clientid: string
  ip_address: string
  created_at: string
  connected_at: string
  subscriptions_cnt: number
  send_msg: number
  node: string
}

export interface IFetchClientsResponse {
  data: IClient[]
}
