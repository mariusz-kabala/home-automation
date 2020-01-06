import mqtt from 'mqtt'
import config from 'config'
import { logger } from '@home/logger'
import MQTTPattern from 'mqtt-pattern'

type ICallbackFunc = (msg: any, topic: string) => void

const subscriptions: {
  [topic: string]: ICallbackFunc[]
} = {}
const subscribedToAll: ICallbackFunc[] = []

const mqttClient = mqtt.connect(`mqtt://${config.get<string>('mqttHost')}:${config.get<string>('mqttPort')}`)

mqttClient.on('message', (topic: string, payload: string): void => {
  let msg: any

  try {
    msg = JSON.parse(payload)
  } catch (err) {
    msg = payload
  }

  logger.log({
    level: 'info',
    message: `New MQTT message: ${topic} ${payload}`,
  })

  const matchTopics = Object.keys(subscriptions).filter(sub => MQTTPattern.matches(sub, topic))

  for (const sub of matchTopics) {
    subscriptions[sub].forEach(callback => callback(msg, topic))
  }

  subscribedToAll.forEach(callback => callback(msg, topic))
})

export const subscribe = (topic: string, callback: ICallbackFunc): void => {
  topic = `${config.get<string>('mqttPrefix')}/${topic}`

  mqttClient.subscribe(topic)

  if (typeof callback !== 'function') {
    return
  }

  if (!Array.isArray(subscriptions[topic])) {
    subscriptions[topic] = []
  }

  subscriptions[topic].push(callback)
}

export const all = (callback: ICallbackFunc): void => {
  subscribedToAll.push(callback)
}

export const publish = <T>(topic: string, payload: T | string): void => {
  mqttClient.publish(
    `${config.get<string>('mqttPrefix')}/${topic}`,
    typeof payload !== 'string' ? JSON.stringify(payload) : payload,
  )
}
