const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    mqttHost: process.env.MQTT_HOST,
    mqttPort: process.env.MQTT_PORT,
    mqttPrefix: 'home',
    devices: [
        {
            name: 'smart-plug-tv',
            id: '46268374cc50e3cf8ce9',
            key: process.env.SMART_PLUG_TV_KEY
          },
          {
            name: 'smart-plug-3',
            id: '72731835cc50e3cfccc1',
            key: process.env.SMART_PLUG_3_KEY
          },
          {
            name: 'smart-plug-2',
            id: '46268374840d8e9529b1',
            key: process.env.SMART_PLUG_2_KEY
          },
          {
            name: 'smart-plug-1',
            id: '72731835cc50e3cf9757',
            key: process.env.SMART_PLUG_1_KEY
          }
    ]
}
