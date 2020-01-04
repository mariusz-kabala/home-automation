import WebSocket, { Data } from 'ws'
import config from 'config'
import uuid4 from 'uuid'

import { IWSSensorMsg } from './types'
import { handleSensorMsg } from './handlers/sensors'
import { handleLightMsg } from './handlers/lights'
import { logger } from './logger'

function start() {
  logger.log({
    traceId: uuid4(),
    level: 'info',
    message: 'Starting ws2mqtt',
  })
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

  ws.onerror = event => {
    logger.log({
      traceId: uuid4(),
      level: 'error',
      message: `Websocket error: ${event.message} ${event.error}`,
    })
  }
}

start()
