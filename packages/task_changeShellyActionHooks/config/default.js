const dotenv = require('dotenv')
dotenv.config()

const { MONGO_CONNECTION_STR } = process.env

module.exports = {
  mongoConnectionStr: MONGO_CONNECTION_STR,
}
