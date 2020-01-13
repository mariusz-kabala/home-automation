const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    mqttHost: process.env.MQTT_HOST,
    mqttPort: process.env.MQTT_PORT,
    mqttPrefix: 'home',
    devices: [
        {
            name: 'mariusz-phone',
            address: '',
            checkInterval: 180000 // 3min
        },
        {
            name: 'weronika-phone',
            address: '',
            checkInterval: 180000 // 3min
        },
        {
            name: 'home-srv',
            address: '',
            checkInterval: 60000 // 1min
        },
        {
            name: 'home-nas',
            address: '',
            checkInterval: 60000 // 1min
        },
        {
            name: 'pi2',
            address: '',
            checkInterval: 60000 // 1min
        },
        {
            name: 'sense-hat-pi',
            address: '',
            checkInterval: 60000 // 1min
        }
    ]
}
