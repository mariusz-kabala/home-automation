const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    wsHost: process.env.WS_HOST,
    wsPort: process.env.WS_PORT
}
