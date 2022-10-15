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
    {
      topic: 'shellies/lights-livingroom/temperature',
      device: 'lights-livingroom',
      field: 'temperature',
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
    {
      topic: 'shellies/lights-sconce-living-room/temperature',
      device: 'lights-sconce-living-room',
      field: 'temperature',
      bucket: 'lights',
    },
    // lights-before-stairs
    {
      topic: 'shellies/lights-before-stairs/relay/0/power',
      device: 'lights-before-stairs-relay-0',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-before-stairs/relay/0/energy',
      device: 'lights-before-stairs-relay-0',
      field: 'energy',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-before-stairs/temperature',
      device: 'lights-before-stairs',
      field: 'temperature',
      bucket: 'lights',
    },
    // lights-garage-entrance
    {
      topic: 'shellies/lights-garage-entrance/relay/0/power',
      device: 'lights-garage-entrance-relay-0',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-garage-entrance/relay/0/energy',
      device: 'lights-garage-entrance-relay-0',
      field: 'energy',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-garage-entrance/temperature',
      device: 'lights-garage-entrance',
      field: 'temperature',
      bucket: 'lights',
    },
    // lights-dining-room
    {
      topic: 'shellies/lights-dining-room/relay/0/power',
      device: 'lights-dining-room-relay-0',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-dining-room/relay/0/energy',
      device: 'lights-dining-room-relay-0',
      field: 'energy',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-dining-room/relay/1/power',
      device: 'lights-dining-room-relay-1',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-dining-room/relay/1/energy',
      device: 'lights-dining-room-relay-1',
      field: 'energy',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-garage-entrance/temperature',
      device: 'lights-dining-room',
      field: 'temperature',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-garage-entrance/voltage',
      device: 'lights-dining-room',
      field: 'voltage',
      bucket: 'lights',
    },
    // lights-laundry-room
    {
      topic: 'shellies/lights-laundry-room/relay/0/power',
      device: 'lights-laundry-room-relay-0',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-laundry-room/relay/0/energy',
      device: 'lights-laundry-room-relay-0',
      field: 'energy',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-laundry-room/temperature',
      device: 'lights-laundry-room',
      field: 'temperature',
      bucket: 'lights',
    },
    // lights-office
    {
      topic: 'shellies/lights-office/relay/0/power',
      device: 'lights-office-relay-0',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-office/relay/0/energy',
      device: 'lights-office-relay-0',
      field: 'energy',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-office/relay/1/power',
      device: 'lights-office-relay-1',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-office/relay/1/energy',
      device: 'lights-office-relay-1',
      field: 'energy',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-office/temperature',
      device: 'lights-office',
      field: 'temperature',
      bucket: 'lights',
    },
    // lights-larder
    {
      topic: 'shellies/lights-larder/relay/0/power',
      device: 'lights-larder-relay-0',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-larder/relay/0/energy',
      device: 'lights-larder-relay-0',
      field: 'energy',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-larder/temperature',
      device: 'lights-larder',
      field: 'temperature',
      bucket: 'lights',
    },
    // lights-above-garage-1
    {
      topic: 'shellies/lights-above-garage-1/relay/0/power',
      device: 'lights-above-garage-1-relay-0',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-above-garage-1/relay/0/energy',
      device: 'lights-above-garage-1-relay-0',
      field: 'energy',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-above-garage-1/temperature',
      device: 'lights-above-garage-1',
      field: 'temperature',
      bucket: 'lights',
    },
    // lights-above-garage-2
    {
      topic: 'shellies/lights-above-garage-2/relay/0/power',
      device: 'lights-above-garage-2-relay-0',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-above-garage-2/relay/0/energy',
      device: 'lights-above-garage-2-relay-0',
      field: 'energy',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-above-garage-2/temperature',
      device: 'lights-above-garage-2',
      field: 'temperature',
      bucket: 'lights',
    },
    // lights-gym
    {
      topic: 'shellies/lights-gym/relay/0/power',
      device: 'lights-gym-relay-0',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-gym/relay/0/energy',
      device: 'lights-gym-relay-0',
      field: 'energy',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-gym/relay/1/power',
      device: 'lights-gym-relay-1',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-gym/relay/1/energy',
      device: 'lights-gym-relay-1',
      field: 'energy',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-gym/temperature',
      device: 'lights-gym',
      field: 'temperature',
      bucket: 'lights',
    },
    // lights-guest-room
    {
      topic: 'shellies/lights-guest-room/relay/0/power',
      device: 'lights-guest-room-relay-0',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-guest-room/relay/0/energy',
      device: 'lights-guest-room-relay-0',
      field: 'energy',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-guest-room/relay/1/power',
      device: 'lights-guest-room-relay-1',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-guest-room/relay/1/energy',
      device: 'lights-guest-room-relay-1',
      field: 'energy',
      bucket: 'lights',
    },
    {
      topic: 'shellies/lights-guest-room/temperature',
      device: 'lights-guest-room',
      field: 'temperature',
      bucket: 'lights',
    },
    // kitchen-sconce
    {
      topic: 'shellies/kitchen-sconce/relay/0/power',
      device: 'kitchen-sconce-relay-0',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/kitchen-sconce/relay/0/energy',
      device: 'kitchen-sconce-relay-0',
      field: 'energy',
      bucket: 'lights',
    },
    {
      topic: 'shellies/kitchen-sconce/temperature',
      device: 'kitchen-sconce',
      field: 'temperature',
      bucket: 'lights',
    },
    // kitchen-main-lights
    {
      topic: 'shellies/kitchen-main-lights/relay/0/power',
      device: 'kitchen-main-lights-relay-0',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/kitchen-main-lights/relay/0/energy',
      device: 'kitchen-main-lights-relay-0',
      field: 'energy',
      bucket: 'lights',
    },
    {
      topic: 'shellies/kitchen-main-lights/temperature',
      device: 'kitchen-main-lights',
      field: 'temperature',
      bucket: 'lights',
    },
    // gym-wardrobe-lights
    {
      topic: 'shellies/gym-wardrobe-lights/relay/0/power',
      device: 'gym-wardrobe-lights-relay-0',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/gym-wardrobe-lights/relay/0/energy',
      device: 'gym-wardrobe-lights-relay-0',
      field: 'energy',
      bucket: 'lights',
    },
    {
      topic: 'shellies/gym-wardrobe-lights/temperature',
      device: 'gym-wardrobe-lights',
      field: 'temperature',
      bucket: 'lights',
    },
    // bedroom-wardrobe-lights
    {
      topic: 'shellies/bedroom-wardrobe-lights/relay/0/power',
      device: 'bedroom-wardrobe-lights-relay-0',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/bedroom-wardrobe-lights/relay/0/energy',
      device: 'bedroom-wardrobe-lights-relay-0',
      field: 'energy',
      bucket: 'lights',
    },
    {
      topic: 'shellies/bedroom-wardrobe-lights/temperature',
      device: 'bedroom-wardrobe-lights',
      field: 'temperature',
      bucket: 'lights',
    },
    // guest-room-wardrobe-lights
    {
      topic: 'shellies/guest-room-wardrobe-lights/relay/0/power',
      device: 'guest-room-wardrobe-lights-relay-0',
      field: 'power',
      bucket: 'lights',
    },
    {
      topic: 'shellies/guest-room-wardrobe-lights/relay/0/energy',
      device: 'guest-room-wardrobe-lights-relay-0',
      field: 'energy',
      bucket: 'lights',
    },
    {
      topic: 'shellies/guest-room-wardrobe-lights/temperature',
      device: 'guest-room-wardrobe-lights',
      field: 'temperature',
      bucket: 'lights',
    },
  ],
}
