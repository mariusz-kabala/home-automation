const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    wsHost: process.env.WS_HOST,
    wsPort: process.env.WS_PORT,
    apiToken: process.env.API_TOKEN,
    mqttHost: process.env.MQTT_HOST,
    mqttPort: process.env.MQTT_PORT,
    mqttPrefix: 'home'
}
