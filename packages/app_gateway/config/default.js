const dotenv = require('dotenv')
dotenv.config()

const { CONSUL_HOST, CONSUL_PORT } = process.env

module.exports = {
    consulHost: CONSUL_HOST,
    consulPort: CONSUL_PORT,
}
