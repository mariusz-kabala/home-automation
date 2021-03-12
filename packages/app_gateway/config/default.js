const dotenv = require('dotenv')
dotenv.config()

const { API_TOKEN, API_HOST, CONSUL_HOST, CONSUL_PORT } = process.env

module.exports = {
  apiToken: API_TOKEN,
  apiHost: API_HOST,
  consulHost: CONSUL_HOST,
  consulPort: CONSUL_PORT,
}
