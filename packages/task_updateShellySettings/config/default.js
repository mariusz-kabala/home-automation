const dotenv = require('dotenv')
dotenv.config()

const { MONGO_CONNECTION_STR } = process.env

module.exports = {
  port: 3000,
  mongoConnectionStr: MONGO_CONNECTION_STR,
}
