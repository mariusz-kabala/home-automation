const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    dbHost: process.env.STATS_DB_HOST,
    dbPort: process.env.STATS_DB_PORT,
    dbUser: process.env.STATS_DB_USER,
    dbPass: process.env.STATS_DB_PASS,
    dbName: 'home',
    mqttHost: process.env.MQTT_HOST,
    mqttPort: process.env.MQTT_PORT,
    mqttPrefix: 'home'
}