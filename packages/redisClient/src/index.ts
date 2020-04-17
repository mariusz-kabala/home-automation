/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable import/exports-last */
/// <reference path="./types.d.ts" />

import { Promise } from 'bluebird'
import * as redis from 'redis'
import { logger } from '@home/logger'
import config from 'config'

Promise.promisifyAll(redis.RedisClient.prototype)
Promise.promisifyAll(redis.Multi.prototype)

export const redisClient = redis.createClient({
  host: config.get<string>('redisHost'),
  port: config.get<number>('redisPort'),
})

export const test = redisClient.getAsync('test')

redisClient.on('error', err =>
  logger.log({
    level: 'error',
    message: `Redis error ${err}`,
  }),
)

redisClient.on('connect', () =>
  logger.log({
    level: 'info',
    message: 'Connected to redis',
  }),
)
