const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  mqttHost: process.env.MQTT_HOST,
  mqttPort: process.env.MQTT_PORT,
  mqttPrefix: 'home',
  devices: [
    {
      name: 'mariusz-phone',
      address: '192.168.0.157', // A8:DB:03:2B:F1:05
      checkInterval: 180000, // 3min
    },
    {
      name: 'weronika-phone',
      address: '192.168.0.192',
      mac: '48:BF:6B:09:66:B2',
      checkInterval: 180000, // 3min
    },
    {
      name: 'home-srv',
      address: '192.168.0.33', // EC:B1:D7:71:BA:AE
      port: 22,
      checkInterval: 60000, // 1min
    },
    {
      name: 'home-nas',
      address: '192.168.0.39', // C8:CB:B8:C8:EA:31
      port: 22,
      checkInterval: 60000, // 1min
    },
    {
      name: 'pi2',
      address: '192.168.0.35', // B8:27:EB:C3:65:CF
      port: 22,
      checkInterval: 60000, // 1min
    },
    {
      name: 'piHAT',
      address: '192.168.0.34', // B8:27:EB:3B:99:5E
      port: 22,
      checkInterval: 60000, // 1min
    },
    {
      name: 'rockrobo',
      address: '192.168.0.24', // 78:11:DC:82:62:E9
      checkInterval: 60000, // 1min
    },
    {
      name: 'openwrt',
      address: '192.168.0.10', // 64:66:B3:E8:35:A9
      port: 22,
      checkInterval: 60000, // 1min
    },
    {
      name: 'bedroomTV',
      port: 3000,
      address: '192.168.0.143', // 3C:CD:93:82:E1:F9
      checkInterval: 300000, // 5min
    },
    {
      name: 'livingroomTV',
      port: 3000,
      address: '192.168.0.151', // A8:23:FE:0E:C0:1B
      checkInterval: 300000, // 5min
    },
    {
      name: 'weronikaPC',
      address: '192.168.0.41',
      mac: '30:3A:64:70:E5:4A',
      checkInterval: 300000, // 5min
    },
  ],
  port: 3000,
  consulHost: CONSUL_HOST,
  consulPort: CONSUL_PORT,
}
