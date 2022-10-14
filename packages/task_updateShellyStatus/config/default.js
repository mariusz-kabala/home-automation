const dotenv = require('dotenv')
dotenv.config()

const { MONGO_CONNECTION_STR, EMQX_URL = 'http://192.168.50.30:18083', EMQX_API_KEY, EMQX_SECURITY_KEY } = process.env

module.exports = {
  port: 3000,
  mongoConnectionStr: MONGO_CONNECTION_STR,
  emqxUrl: EMQX_URL,
  emqxApiKey: EMQX_API_KEY,
  emqxSecurityKey: EMQX_SECURITY_KEY,
}
