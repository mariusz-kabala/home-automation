const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  mqttHost: process.env.MQTT_HOST,
  mqttPort: process.env.MQTT_PORT,
  mqttPrefix: 'home',
  serverMQTTPort: 1883,
  serverWSPort: 8888,
}
