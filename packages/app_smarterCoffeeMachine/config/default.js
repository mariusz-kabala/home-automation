const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  mqttHost: process.env.MQTT_HOST,
  mqttPort: process.env.MQTT_PORT,
  mqttPrefix: 'home',
  ipAddress: '192.168.0.52', // 5C:CF:7F:12:D3:B7
  port: 2081,
}
