import { createClient } from 'redis'
import config from 'config'
import { logger } from '@home/logger'

export const rClient = createClient({
  url: config.get<string>('redisConnectionStr'),
})

rClient.on('error', err => {
  logger.error(`Redis client error ${err}`)
  process.exit(1)
})

export async function connectRedis() {
  await rClient.connect()
}

export async function disconnectRedis() {
  await rClient.disconnect()
}
