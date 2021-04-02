const dotenv = require('dotenv')
dotenv.config()

const { API_TOKEN, API_HOST, CONSUL_HOST, CONSUL_PORT } = process.env

module.exports = {
  apiToken: API_TOKEN,
  apiHost: API_HOST,
  consulHost: CONSUL_HOST,
  consulPort: CONSUL_PORT,
  consulServices: ['pollutionReports', 'openWeather', 'statsCollector', 'lg2mqtt'],
  valetudo: {
    rockrobo: '192.168.0.25',
  },
  mappers: {
    sensorToRoom: {
      // mac address - room
      '00:17:88:01:03:28:17:72': 'Corridor', // Corridor Motion Sensor 1
      '00:17:88:01:03:28:20:b5': 'Corridor', // Corridor Motion Sensor 2
      '00:15:8d:00:02:bf:a2:be': 'Corridor', // Window / Door Sensor
      '00:15:8d:00:02:01:f6:d0': 'Livingroom', // Livingroom Multi Sensor
      '00:15:8d:00:01:f4:ec:9c': 'Bedroom', // Bedroom Multi Sensor
      '00:15:8d:00:02:f7:c2:af': 'Corridor', // Corridor Multi Sensor
      '00:15:8d:00:01:f4:ee:4d': 'Bathroom', // Bathroom Multi Sensor
      '60:a4:23:ff:fe:a0:f9:aa': 'Livingroom', // Heiman - humidity and temperature
      '04:cf:8c:df:3c:7b:41:4f': 'Livingroom', // Light Sensor
      '04:cf:8c:df:3c:7b:60:de': 'Bedroom', // Light Sensor (2)
      '84:2e:14:ff:fe:12:64:a6': 'Kitchen', // TV Plug
      '84:2e:14:ff:fe:12:65:01': 'Kitchen', // Kitchen power plug
      '84:2e:14:ff:fe:12:64:5d': 'Bedroom', // Bedroom tv plug
      '00:17:88:01:03:28:29:f1': 'Kitchen', // Kitchen Motion Sensor
    },
    lightToRoom: {},
  },
}
