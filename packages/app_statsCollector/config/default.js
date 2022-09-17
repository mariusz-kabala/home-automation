const dotenv = require('dotenv')
dotenv.config()

const {
  STATS_DB_HOST,
  STATS_DB_PORT,
  STATS_DB_TOKEN,
  STATS_DB_ORGANISATION,
  CONSUL_HOST,
  CONSUL_PORT,
  MQTT_HOST,
  MQTT_PORT,
} = process.env

module.exports = {
  dbHost: STATS_DB_HOST,
  dbPort: STATS_DB_PORT,
  token: STATS_DB_TOKEN,
  consulHost: CONSUL_HOST,
  consulPort: CONSUL_PORT,
  organisation: STATS_DB_ORGANISATION,
  buckets: {
    sensors: 'sensors',
    lights: 'lights',
  },
  mqttHost: MQTT_HOST,
  mqttPort: MQTT_PORT,
  mqttPrefix: '',
  topics: [
    {
      topic: 'zigbee2mqtt/office-temp-sensor',
      device: 'office-sensor',
      bucket: 'sensors',
    },
    // lights-livingroom
    {
      topic: 'shellies/lights-livingroom/relay/0/power',
      device: 'lights-livingroom-relay-0',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-livingroom/relay/0/energy',
      device: 'lights-livingroom-relay-0',
      field: 'energy',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-livingroom/relay/1/power',
      device: 'lights-livingroom-relay-1',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-livingroom/relay/1/energy',
      device: 'lights-livingroom-relay-1',
      field: 'energy',
      bucket: 'lights',
    },
    // lights-sconce-living-room
    {
      topic: 'shellies/lights-sconce-living-room/relay/0/power',
      device: 'lights-sconce-living-room-relay-0',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-sconce-living-room/relay/0/energy',
      device: 'lights-sconce-living-room-relay-0',
      field: 'energy',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-sconce-living-room/relay/1/power',
      device: 'lights-sconce-living-room-relay-1',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-sconce-living-room/relay/1/energy',
      device: 'lights-sconce-living-room-relay-1',
      field: 'energy',
      bucket: 'lights',
    },
  ],
}
