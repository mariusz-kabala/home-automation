import net from 'net'
import http from 'http'

import aedes, { PublishPacket } from 'aedes'
import config from 'config'
import mqtt from 'mqtt'
import ws from 'websocket-stream'
import { logger } from '@home/logger'

import { authUser } from './helpers/auth'

const instance = aedes({
  authenticate: async (_client, jwt, _, callback) => {
    callback(null, await authUser(jwt))
  },
})
const mqttServer = net.createServer(instance.handle)
const httpServer = http.createServer()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
ws.createServer({ server: httpServer }, instance.handle as any)

mqttServer.listen(config.get<string>('serverMQTTPort'), () => {
  logger.log({
    level: 'info',
    message: 'MqttBroker started',
  })
})

httpServer.listen(config.get<string>('serverWSPort'), () => {
  logger.log({
    level: 'info',
    message: 'Websocket server started',
  })
})

const mqttClient = mqtt.connect(`mqtt://${config.get<string>('mqttHost')}:${config.get<string>('mqttPort')}`)

mqttClient.on('message', (_topic: string, _message: string, mqttPackage: PublishPacket): void => {
  instance.publish(mqttPackage, err => {
    if (err) {
      logger.log({
        level: 'error',
        message: 'MqttBroker started',
      })
    }
  })
})

mqttClient.on('error', err => {
  logger.log({
    level: 'error',
    message: `Can not connect to main MQTT server: ${err}`,
  })
})

mqttClient.on('connect', () =>
  logger.log({
    level: 'info',
    message: `Connected to main MQTT server`,
  }),
)

mqttClient.subscribe(`${config.get<string>('mqttPrefix')}/#`)
