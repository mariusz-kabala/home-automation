import WebSocket, { Data } from 'ws'
import config from 'config'

function start() {
  const wsConnectionStr = `ws://${config.get<string>('wsHost')}:${config.get<string>('wsPort')}`
  console.log(wsConnectionStr)
  const ws = new WebSocket(wsConnectionStr)

  ws.onmessage = (wsMessage: { data: Data }) => {
    const msg: any = JSON.parse(wsMessage.data as string)

    console.log(msg)
  }
}

start()
