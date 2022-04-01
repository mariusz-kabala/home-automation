const dotenv = require('dotenv')
dotenv.config()

const {
  MONGO_CONNECTION_STR,
  VERNE_MQ_URL = 'mqtt.kabala.tech',
  VERNE_MQ_API_KEY,
  CONSUL_HOST,
  CONSUL_PORT,
  HTTP_PORT = 3000,
} = process.env

module.exports = {
  port: HTTP_PORT,
  mongoConnectionStr: MONGO_CONNECTION_STR,
  verneMQUrl: VERNE_MQ_URL,
  verneMQApiKey: VERNE_MQ_API_KEY,
  consulHost: CONSUL_HOST,
  consulPort: CONSUL_PORT,
}
