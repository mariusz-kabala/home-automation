const dotenv = require('dotenv')
dotenv.config()

const { MQTT_HOST, MQTT_PORT, CONSUL_HOST, CONSUL_PORT, TV_KEYS } = process.env

module.exports = {
  tvKeys: TV_KEYS,
  mqttHost: MQTT_HOST,
  mqttPort: MQTT_PORT,
  consulHost: CONSUL_HOST,
  consulPort: CONSUL_PORT,
  mqttPrefix: 'home',
  devices: {
    // bedroom: '192.168.0.143',
    livingroom: '192.168.0.151',
  },
  devicesMacAddresses: {
    // bedroom: '3C:CD:93:82:E1:F9',
    livingroom: 'A8:23:FE:0E:C0:1B',
  },
  deviceStartUpDelay: {
    bedroom: 5000, // 5 sec,
    livingroom: 500, // 0.5 s
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
