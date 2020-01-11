const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  tvKeys: process.env.TV_KEYS,
  mqttHost: process.env.MQTT_HOST,
  mqttPort: process.env.MQTT_PORT,
  mqttPrefix: 'home',
  devices: {
    bedroom: '192.168.0.143',
    livingroom: '192.168.0.151',
  },
  devicesMacAddresses: {
    bedroom: '3C:CD:93:82:E1:F9',
    livingroom: 'A8:23:FE:0E:C0:1B',
  },
  apps: {
    youtube: 'youtube.leanback.v4',
    hbo: 'hbogocev5',
    netflix: 'netflix',
    ipla: 'ipla',
    plex: 'cdp-30',
    hdmi1: 'com.webos.app.hdmi1',
    hdmi2: 'com.webos.app.hdmi2',
    hdmi3: 'com.webos.app.hdmi3',
  },
}
