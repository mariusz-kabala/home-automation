import WebSocket, { Data } from 'ws'
import config from 'config'
import { logger } from '@home/logger'
import { registerInConsul } from '@home/commons'
import { IWSSensorMsg, IWSGroupMsg } from './types'
import { handleSensorMsg } from './handlers/sensors'
import { handleLightMsg } from './handlers/lights'
import { handleGroupMsg } from './handlers/groups'

let pingTimeout: NodeJS.Timeout
let ws: WebSocket

function exitProcess() {
  setTimeout(() => {
    process.exit(1)
  }, 1000)
}

function heartbeat() {
  clearTimeout(pingTimeout)
  pingTimeout = setTimeout(() => {
    logger.log({
      level: 'error',
      message: 'Ping timeout! Websocket connection has been closed',
    })
    ws.terminate()
    exitProcess()
  }, 30000)
}

function start() {
  logger.log({
    level: 'info',
    message: 'Starting ws2mqtt',
  })
  const wsConnectionStr = `ws://${config.get<string>('wsHost')}:${config.get<string>('wsPort')}`

  ws = new WebSocket(wsConnectionStr)

  ws.on('open', heartbeat)

  ws.on('close', () => {
    logger.log({
      level: 'error',
      message: 'Websocket connection has been closed',
    })
    exitProcess()
  })

  ws.onmessage = (wsMessage: { data: Data }) => {
    const msg: IWSSensorMsg | IWSGroupMsg = JSON.parse(wsMessage.data as string)

    heartbeat()

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

    exitProcess()
  }
}

start()
registerInConsul('ws2mqtt')
