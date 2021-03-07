const dotenv = require('dotenv')
dotenv.config()

const {
  STATS_DB_HOST,
  STATS_DB_PORT,
  STATS_DB_TOKEN,
  STATS_DB_ORGANISATION,
  CONSUL_HOST,
  CONSUL_PORT,
  MQTT_HOST,
  MQTT_PORT,
} = process.env

module.exports = {
  dbHost: STATS_DB_HOST,
  dbPort: STATS_DB_PORT,
  token: STATS_DB_TOKEN,
  consulHost: CONSUL_HOST,
  consulPort: CONSUL_PORT,
  organisation: STATS_DB_ORGANISATION,
  buckets: {
    sensors: 'sensors',
    lights: 'lights',
  },
  mqttHost: MQTT_HOST,
  mqttPort: MQTT_PORT,
  mqttPrefix: 'home',
}
