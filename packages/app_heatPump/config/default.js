const dotenv = require('dotenv')
dotenv.config()

const {
  MONGO_CONNECTION_STR,
  MQTT_HOST,
  MQTT_PORT,
  CONSUL_HOST,
  CONSUL_PORT,
  HTTP_PORT = 3000,
  HEAT_PUMP_USERNAME,
  HEAT_PUMP_PASSWORD,
  STATS_DB_HOST,
  STATS_DB_PORT,
  STATS_DB_TOKEN,
  STATS_DB_ORGANISATION,
  STATS_DB_BUCKET,
} = process.env

module.exports = {
  port: HTTP_PORT,
  mqttHost: MQTT_HOST,
  mqttPort: MQTT_PORT,
  mqttPrefix: '',
  mongoConnectionStr: MONGO_CONNECTION_STR,
  consulHost: CONSUL_HOST,
  consulPort: CONSUL_PORT,
  heatPumpUsername: HEAT_PUMP_USERNAME,
  heatPumpPassword: HEAT_PUMP_PASSWORD,
  statsDb: {
    host: STATS_DB_HOST,
    port: STATS_DB_PORT,
    token: STATS_DB_TOKEN,
    organisation: STATS_DB_ORGANISATION,
    bucket: STATS_DB_BUCKET,
  },
}
