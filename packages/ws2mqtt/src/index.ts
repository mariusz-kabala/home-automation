import WebSocket, { Data } from 'ws'
import config from 'config'
import { logger } from '@home/logger'

import { IWSSensorMsg, IWSGroupMsg } from './types'
import { handleSensorMsg } from './handlers/sensors'
import { handleLightMsg } from './handlers/lights'
import { handleGroupMsg } from './handlers/groups'

function start() {
  logger.log({
    level: 'info',
    message: 'Starting ws2mqtt',
  })
  const wsConnectionStr = `ws://${config.get<string>('wsHost')}:${config.get<string>('wsPort')}`

  const ws = new WebSocket(wsConnectionStr)
  // let pingTimeout: NodeJS.Timeout

  // function heartbeat() {
  //   clearTimeout(pingTimeout)

  //   pingTimeout = setTimeout(() => {
  //     ws.terminate()
  //   }, 30000 + 1000)
  // }

  // ws.on('open', heartbeat)
  // ws.on('ping', heartbeat)
  ws.on('close', () => {
    logger.log({
      level: 'error',
      message: 'Websocket connection has been closed',
    })
    // clearTimeout(pingTimeout)
  })

  ws.onmessage = (wsMessage: { data: Data }) => {
    const msg: IWSSensorMsg | IWSGroupMsg = JSON.parse(wsMessage.data as string)

    logger.log({
      level: 'info',
      message: `New webSocket message ${wsMessage.data}`,
      traceid: msg.uniqueid,
    })

    switch (msg.r) {
      case 'sensors':
        return handleSensorMsg(msg as IWSSensorMsg)
      case 'lights':
        return handleLightMsg(msg as IWSSensorMsg)
      case 'groups':
        return handleGroupMsg(msg as IWSGroupMsg)
      default:
        logger.log({
          level: 'error',
          message: `Not supported WS message: ${wsMessage.data}`,
          traceid: msg.uniqueid,
        })
        return
    }
  }

  ws.onerror = event => {
    logger.log({
      level: 'error',
      message: `Websocket error: ${event.message} ${event.error}`,
    })
  }
}

start()
