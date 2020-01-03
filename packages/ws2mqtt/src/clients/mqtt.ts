import mqtt from 'mqtt'
import config from 'config'

const mqttClient = mqtt.connect(`mqtt://${config.get<string>('mqttHost')}:${config.get<string>('mqttPort')}`)

export const publish = <T>(topic: string, payload: T | string): void => {
  mqttClient.publish(
    `${config.get<string>('mqttPrefix')}/${topic}`,
    typeof payload !== 'string' ? JSON.stringify(payload) : payload,
  )
}
