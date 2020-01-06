const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    env: process.env.NODE_ENV,
    httpPort: process.env.HTTP_PORT,
    telegramToken: process.env.TELEGRAM_TOKEN,
    webHookUrl: process.env.TELEGRAM_WEBHOOK_URL,
    dbHost: process.env.STATS_DB_HOST,
    dbPort: process.env.STATS_DB_PORT,
    dbUser: process.env.STATS_DB_USER,
    dbPass: process.env.STATS_DB_PASS,
    dbName: 'home',
    mqttHost: process.env.MQTT_HOST,
    mqttPort: process.env.MQTT_PORT,
    mqttPrefix: 'home'
}
