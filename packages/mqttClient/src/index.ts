import mqtt, { IClientPublishOptions } from 'mqtt'
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
  const topicArr = topic.split('/')
  topicArr.shift()

  const localTopic = topicArr.join('/')

  for (const sub of matchTopics) {
    subscriptions[sub].forEach(callback => callback(msg, localTopic))
  }

  subscribedToAll.forEach(callback => callback(msg, localTopic))
})

export const subscribe = (topic: string, callback: ICallbackFunc): (() => void) => {
  topic = `${config.get<string>('mqttPrefix')}/${topic}`

  mqttClient.subscribe(topic)

  if (typeof callback !== 'function') {
    return () => null
  }

  if (!Array.isArray(subscriptions[topic])) {
    subscriptions[topic] = []
  }

  const length = subscriptions[topic].push(callback)

  return () => {
    subscriptions[topic].splice(length - 1, 1)

    if (subscriptions[topic].length === 0) {
      mqttClient.unsubscribe(topic)
    }
  }
}

export const all = (callback: ICallbackFunc): void => {
  subscribedToAll.push(callback)
}

export const publish = <T>(
  topic: string,
  payload: T | string,
  options: IClientPublishOptions = { qos: 0, retain: false },
): void => {
  const message = typeof payload !== 'string' ? JSON.stringify(payload) : payload

  mqttClient.publish(`${config.get<string>('mqttPrefix')}/${topic}`, message, options)
}
