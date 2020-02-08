const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  openWeatherAPIKey: process.env.OPEN_WEATHER_API_KEY,
  mqttHost: process.env.MQTT_HOST,
  mqttPort: process.env.MQTT_PORT,
  mqttPrefix: 'home',
  cities: process.env.CITIES.split(' '),
}
