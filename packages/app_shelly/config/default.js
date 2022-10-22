const dotenv = require('dotenv')
dotenv.config()

const { MONGO_CONNECTION_STR, MQTT_HOST, MQTT_PORT, CONSUL_HOST, CONSUL_PORT, HTTP_PORT = 3000 } = process.env

module.exports = {
  port: HTTP_PORT,
  mqttHost: MQTT_HOST,
  mqttPort: MQTT_PORT,
  mqttPrefix: '',
  mongoConnectionStr: MONGO_CONNECTION_STR,
  consulHost: CONSUL_HOST,
  consulPort: CONSUL_PORT,
}
