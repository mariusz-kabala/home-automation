const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    aqicnorgAPIKey: process.env.AQICN_ORG_API_KEY,
    airvisualAPIKey: process.env.AIR_VISUAL_API_KEY,
    mqttHost: process.env.MQTT_HOST,
    mqttPort: process.env.MQTT_PORT,
    mqttPrefix: 'home',
    airVisualLocations: [
        {
            city: 'Szczecin',
            state: 'West Pomerania',
            country: 'Poland'
        }
    ],
    aqicnorgLocations: [
        'Szczecin'
    ]
}
