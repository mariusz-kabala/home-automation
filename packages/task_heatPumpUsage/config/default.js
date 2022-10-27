const dotenv = require('dotenv')
dotenv.config()

const {
  MONGO_CONNECTION_STR,
  STATS_DB_HOST,
  STATS_DB_PORT,
  STATS_DB_TOKEN,
  STATS_DB_ORGANISATION,
  STATS_DB_BUCKET,
  HEAT_PUMP_USERNAME,
  HEAT_PUMP_PASSWORD,
} = process.env

module.exports = {
    mongoConnectionStr: MONGO_CONNECTION_STR,
    heatPumpUsername: HEAT_PUMP_USERNAME,
    heatPumpPassword: HEAT_PUMP_PASSWORD,
    statsDb: {
      host: STATS_DB_HOST,
      port: STATS_DB_PORT,
      token: STATS_DB_TOKEN,
      organisation: STATS_DB_ORGANISATION,
      bucket: STATS_DB_BUCKET,
    },
  }
