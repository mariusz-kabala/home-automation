const dotenv = require('dotenv')
dotenv.config()

const { CONSUL_HOST, CONSUL_PORT, MONGO_CONNECTION_STR } = process.env

module.exports = {
  mongoConnectionStr: MONGO_CONNECTION_STR,
  consulHost: CONSUL_HOST,
  consulPort: CONSUL_PORT,
}
