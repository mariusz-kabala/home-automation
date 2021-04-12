const dotenv = require('dotenv')
dotenv.config()

const { MQTT_HOST, MQTT_PORT, CONSUL_HOST, CONSUL_PORT, AQICN_ORG_API_KEY, AIR_VISUAL_API_KEY } = process.env

module.exports = {
  aqicnorgAPIKey: AQICN_ORG_API_KEY,
  airvisualAPIKey: AIR_VISUAL_API_KEY,
  mqttHost: MQTT_HOST,
  mqttPort: MQTT_PORT,
  consulHost: CONSUL_HOST,
  consulPort: CONSUL_PORT,
  mqttPrefix: 'home',
  airVisualLocations: {
    'Szczecin,PL': {
      city: 'Szczecin',
      state: 'West Pomerania',
      country: 'Poland',
    },
    'Katowice,PL': {
      city: 'Sosnowiec',
      state: 'Silesia',
      country: 'Poland',
    },
    'Miechow,PL': {
      city: 'Niepolomice',
      state: 'Lesser Poland Voivodeship',
      country: 'Poland',
    },
    'Berlin,DE': {
      city: 'Mitte',
      state: 'Berlin',
      country: 'Germany',
    },
  },
  aqicnorgLocations: {
    'Szczecin,PL': 'geo:53.433;14.5495',
    'Katowice,PL': 'geo:50.264893;19.023781',
    'Miechow,PL': 'geo:50.359050;20.172040',
    'Berlin,DE': 'geo:52.520008;13.404954',
  },
  port: 3000,
}
