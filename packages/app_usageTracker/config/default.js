const dotenv = require('dotenv')
dotenv.config()

const {
  CONSUL_HOST,
  CONSUL_PORT,
  MONGO_CONNECTION_STR,
  QUEUE_CONNECTION_STR,
  HTTP_PORT,
  REDIS_CONNECTION_STR,
} = process.env

module.exports = {
  mongoConnectionStr: MONGO_CONNECTION_STR,
  queueConnectionStr: QUEUE_CONNECTION_STR,
  redisConnectionStr: REDIS_CONNECTION_STR,
  consulHost: CONSUL_HOST,
  consulPort: CONSUL_PORT,
  port: HTTP_PORT,
  devices: {
    'lights-before-stairs': [
      {
        max: 10, //10min
      },
      {
        after: 'sunset',
        before: 'sunraise',
        max: 25,
      },
      {},
    ],
  },
}
