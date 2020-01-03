import WebSocket, { Data } from 'ws'
import config from 'config'

import { IWSSensorMsg } from './types'
import { handleSensorMsg } from './handlers/sensors'
import { handleLightMsg } from './handlers/lights'

function start() {
  const wsConnectionStr = `ws://${config.get<string>('wsHost')}:${config.get<string>('wsPort')}`

  const ws = new WebSocket(wsConnectionStr)

  ws.onmessage = (wsMessage: { data: Data }) => {
    const msg: IWSSensorMsg = JSON.parse(wsMessage.data as string)

    switch (msg.r) {
      case 'sensors':
        return handleSensorMsg(msg)
      case 'lights':
        return handleLightMsg(msg)
      default:
        return
    }
  }
}

start()
