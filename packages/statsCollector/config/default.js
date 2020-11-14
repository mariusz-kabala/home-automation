const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  dbHost: process.env.STATS_DB_HOST,
  dbPort: process.env.STATS_DB_PORT,
  token: process.env.STATS_DB_TOKEN,
  organisation: process.env.STATS_DB_ORGANISATION,
  bucket: process.env.STATS_DB_BUCKET,
  mqttHost: process.env.MQTT_HOST,
  mqttPort: process.env.MQTT_PORT,
  mqttPrefix: 'home',
}
