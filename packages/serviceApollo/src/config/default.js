const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  apiToken: process.env.API_TOKEN,
  apiHost: process.env.API_HOST,
}
