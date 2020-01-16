import mqtt, { IClientPublishOptions } from 'mqtt'
import config from 'config'
import MQTTPattern from 'mqtt-pattern'
import uuid4 from 'uuid'

type ICallbackFunc = (msg: any, topic: string) => void

const subscriptions: {
  [topic: string]: ICallbackFunc[]
} = {}
const subscribedToAll: ICallbackFunc[] = []
const oneTimePromises: {
  [topic: string]: {
    timeout: NodeJS.Timeout
    resolve: Function
    reject: Function
    id: string
  }[]
} = {}

const mqttClient = mqtt.connect(`mqtt://${config.get<string>('mqttHost')}:${config.get<string>('mqttPort')}`)
console.log('chuj', `mqtt://${config.get<string>('mqttHost')}:${config.get<string>('mqttPort')}`)
const getLocalTopic = (topic: string) => {
  const topicArr = topic.split('/')
  topicArr.shift()

  return topicArr.join('/')
}

const cancelSubscriptionIfNeeded = (topic: string) => {
  if (Object.keys(oneTimePromises).some(t => t === topic)) {
    return
  }

  if (Object.keys(subscriptions).some(t => t === topic)) {
    return
  }

  mqttClient.unsubscribe(topic)
}

const resolveOneTimePromises = (topic: string, msg: any) => {
  const matchTopics = Object.keys(oneTimePromises).filter(sub => MQTTPattern.matches(sub, topic))

  for (const subTopic of matchTopics) {
    oneTimePromises[subTopic].forEach(promise => promise.resolve(msg, getLocalTopic(topic)))

    delete oneTimePromises[subTopic]

    cancelSubscriptionIfNeeded(subTopic)
  }
}

const getTimeout = (id: string) => {
  return () => {
    for (const topic of Object.keys(oneTimePromises)) {
      const index = oneTimePromises[topic].findIndex(p => p.id === id)
      if (index !== -1) {
        const promise = oneTimePromises[topic][index]

        promise.reject({ timeout: true })
        oneTimePromises[topic].splice(index, 1)

        if (oneTimePromises[topic].length === 0) {
          delete oneTimePromises[topic]
          cancelSubscriptionIfNeeded(topic)
        }
      }
    }
  }
}

mqttClient.on('error', err => {
  console.log('error')
  console.log(err)
})

mqttClient.on('connect', () => {
  console.log('connected')
})

mqttClient.on('message', (topic: string, payload: string): void => {
  let msg: any
console.log('on message!!!')
  try {
    msg = JSON.parse(payload)
  } catch (err) {
    msg = payload
  }
console.log(topic, msg)
  const matchTopics = Object.keys(subscriptions).filter(sub => MQTTPattern.matches(sub, topic))
  const localTopic = getLocalTopic(topic)

  for (const sub of matchTopics) {
    subscriptions[sub].forEach(callback => callback(msg, localTopic))
  }

  subscribedToAll.forEach(callback => callback(msg, localTopic))

  resolveOneTimePromises(topic, msg)
})

export const publish = <T>(
  topic: string,
  payload: T | string,
  options: IClientPublishOptions = { qos: 0, retain: false },
): void => {
  const message = typeof payload !== 'string' ? JSON.stringify(payload) : payload

  mqttClient.publish(`${config.get<string>('mqttPrefix')}/${topic}`, message, options)
}

export const get = <T>(params: {
  topic: string
  publish?: {
    topic: string
    message?: T | string
  }
  timeout?: number
}) => {
  const { topic, timeout = 1500} = params
  const subscriptionTopic = `${config.get<string>('mqttPrefix')}/${topic}`

  if (!oneTimePromises[subscriptionTopic]) {
    oneTimePromises[subscriptionTopic] = []
  }

  const id = uuid4()

  return new Promise((resolve, reject) => {
    oneTimePromises[subscriptionTopic].push({
      timeout: setTimeout(getTimeout(id), timeout),
      resolve,
      reject,
      id,
    })

    mqttClient.subscribe(subscriptionTopic)

    if (params.publish) {
      publish(params.publish.topic, params.publish.message || '')
    }
  })
}

export const subscribe = (topic: string, callback: ICallbackFunc): (() => void) => {
  const subscriptionTopic = `${config.get<string>('mqttPrefix')}/${topic}`

  mqttClient.subscribe(subscriptionTopic)

  if (typeof callback !== 'function') {
    return () => null
  }

  if (!Array.isArray(subscriptions[subscriptionTopic])) {
    subscriptions[subscriptionTopic] = []
  }

  const length = subscriptions[subscriptionTopic].push(callback)

  return () => {
    subscriptions[subscriptionTopic].splice(length - 1, 1)

    if (subscriptions[subscriptionTopic].length === 0) {
      delete subscriptions[subscriptionTopic]

      cancelSubscriptionIfNeeded(subscriptionTopic)
    }
  }
}

export const all = (callback: ICallbackFunc): void => {
  subscribedToAll.push(callback)
}
