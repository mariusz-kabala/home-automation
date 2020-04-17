const dotenv = require('dotenv')
dotenv.config()

const {
  GOOGLE_CONSUMER_KEY,
  GOOGLE_CONSUMER_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  APP_DOMAIN,
  DB_HOST,
  JWT_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
  SESSION_SECRET,
  REDIS_HOST,
} = process.env

module.exports = {
  port: 3000,
  googleConsumerKey: GOOGLE_CONSUMER_KEY,
  googleConsumerSecret: GOOGLE_CONSUMER_SECRET,
  githubClientId: GITHUB_CLIENT_ID,
  githubClientSecret: GITHUB_CLIENT_SECRET,
  appDomain: APP_DOMAIN,
  dbHost: DB_HOST,
  dbName: 'homeAuthService',
  redisHost: REDIS_HOST,
  redisPort: 6379,
  users: ['mariusz@kabala.waw.pl'],
  admins: ['mariusz@kabala.waw.pl'],
  secret: JWT_SECRET,
  refreshTokenSecret: JWT_REFRESH_TOKEN_SECRET,
  tokenLife: 900,
  refreshTokenLife: 86400,
  sessionSecret: SESSION_SECRET,
}
