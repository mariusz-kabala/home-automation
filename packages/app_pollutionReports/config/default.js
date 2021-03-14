const dotenv = require('dotenv')
dotenv.config()

const { MQTT_HOST, MQTT_PORT, CONSUL_HOST, CONSUL_PORT, AQICN_ORG_API_KEY, AIR_VISUAL_API_KEY } = process.env

module.exports = {
  aqicnorgAPIKey: AQICN_ORG_API_KEY,
  airvisualAPIKey: AIR_VISUAL_API_KEY,
  mqttHost: MQTT_HOST,
  mqttPort: MQTT_PORT,
  consulHost: CONSUL_HOST,
  consulPort: CONSUL_PORT,
  mqttPrefix: 'home',
  airVisualLocations: [
    {
      city: 'Szczecin',
      state: 'West Pomerania',
      country: 'Poland',
    },
  ],
  aqicnorgLocations: ['Szczecin'],
  port: 3000,
}
