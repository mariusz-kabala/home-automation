const dotenv = require('dotenv')
dotenv.config()

const { MQTT_HOST, MQTT_PORT, CONSUL_HOST, CONSUL_PORT, OPEN_WEATHER_API_KEY, CITIES } = process.env

module.exports = {
  openWeatherAPIKey: OPEN_WEATHER_API_KEY,
  mqttHost: MQTT_HOST,
  mqttPort: MQTT_PORT,
  consulHost: CONSUL_HOST,
  consulPort: CONSUL_PORT,
  mqttPrefix: 'home',
  cities: CITIES.split(' '),
}
