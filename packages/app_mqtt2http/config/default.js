const dotenv = require('dotenv')
dotenv.config()

const { API_TOKEN, API_HOST, MQTT_HOST, MQTT_PORT, CONSUL_HOST, CONSUL_PORT } = process.env

module.exports = {
  apiToken: API_TOKEN,
  apiHost: API_HOST,
  mqttHost: MQTT_HOST,
  mqttPort: MQTT_PORT,
  consulHost: CONSUL_HOST,
  consulPort: CONSUL_PORT,
  mqttPrefix: 'home',
  namespace: 'zigbee',
}
