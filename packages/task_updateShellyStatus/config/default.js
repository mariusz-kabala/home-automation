const dotenv = import('dotenv')
dotenv.config()

const { MONGO_CONNECTION_STR, VERNE_MQ_URL = 'mqtt.kabala.tech', VERNE_MQ_API_KEY } = process.env

module.exports = {
  port: 3000,
  mongoConnectionStr: MONGO_CONNECTION_STR,
  verneMQUrl: VERNE_MQ_URL,
  verneMQApiKey: VERNE_MQ_API_KEY,
}
