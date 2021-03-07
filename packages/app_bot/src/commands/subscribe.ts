/* eslint-disable @typescript-eslint/camelcase */
import TelegramBot from 'node-telegram-bot-api'
import { redisClient } from '@home/redis'
import { alertTypes, alertLevels } from '@home/commons'
import { subscribe } from '@home/mqtt'

const prefix = 'hal9000-subscription-'

/**
 * returns list of possible topic with given type and level
 */
function getPossibleDBKeys(params: { type?: alertTypes | string; level?: alertLevels | string }) {
  let { type = '+', level = '+' } = params

  if (type === 'all') {
    type = '+'
  }

  if (level === 'all') {
    level = '+'
  }

  const topics = [
    `${prefix}alerts/+/+`,
    `${prefix}alerts/${type}/${level}`,
    `${prefix}alerts/${type}/+`,
    `${prefix}alerts/+/${level}`,
  ]

  return [...new Set(topics)]
}

/**
 * returns list of existing in db keys related to given params
 */
async function getExistingDBKeys(params: { type?: alertTypes | string; level?: alertLevels | string }) {
  const possibleKeys = getPossibleDBKeys(params)

  return (await Promise.all(possibleKeys.map(key => redisClient.existsAsync(key))))
    .map((result: 0 | 1, key: number) => {
      return result === 1 ? possibleKeys[key] : null
    })
    .filter(value => value) as string[]
}

/**
 * returns subscribers saved in DB related to given params
 */
async function getSubscribers(params: { type?: alertTypes | string; level?: alertLevels | string }) {
  const keysToCheck = await getExistingDBKeys(params)

  const results: {
    [dbKey: string]: string[]
  } = {}
  ;(await Promise.all(keysToCheck.map(key => redisClient.lrangeAsync<string[]>(key, 0, -1)))).forEach(
    (subscribers: string[], key: number) => {
      const dbKey = keysToCheck[key] + ''

      if (subscribers.length > 0) {
        results[dbKey] = subscribers
      }
    },
  )

  return results
}

async function getSubscribersByDBKeys(keys: string[]) {
  const results: {
    [dbKey: string]: string[]
  } = {}
  ;(await Promise.all(keys.map(key => redisClient.lrangeAsync<string[]>(key, 0, -1)))).forEach(
    (subscribers: string[], key: number) => {
      const dbKey = keys[key] + ''

      if (subscribers.length > 0) {
        results[dbKey] = subscribers
      }
    },
  )

  return results
}

async function hasSubscription(
  params: {
    type?: alertTypes | string
    level?: alertLevels | string
  },
  chatId: number,
) {
  const subscribers = await getSubscribers(params)

  for (const topic of Object.keys(subscribers)) {
    if (subscribers[topic].some(sub => sub === chatId + '')) {
      return true
    }
  }

  return false
}

async function deleteSubscriptionIfNeeded(type: alertTypes | string, level: alertLevels | string, chatId: number) {
  const subscribers = await getSubscribers({ type, level })
  let status = false

  for (const dbKey of Object.keys(subscribers)) {
    if (subscribers[dbKey].includes(chatId + '')) {
      status = true
      await redisClient.lremAsync(dbKey, 0, chatId)
    }
  }
  return status
}

async function saveSubscriptionIfNeeded(type: alertTypes | string, level: alertLevels | string, chatId: number) {
  const alreadySubscribed = await hasSubscription(
    {
      type,
      level,
    },
    chatId,
  )

  if (alreadySubscribed) {
    return false
  }

  await redisClient.lpushAsync(`${prefix}alerts/${type}/${level}`, chatId)

  return true
}

function findTypes(msg: string) {
  const found = []

  for (const type in alertTypes) {
    if (msg.includes(type)) {
      found.push(type)
    }
  }

  return found
}

function findLevels(msg: string): string[] {
  const result: string[] = []

  if (['all levels', 'wszystkie poziomy'].some(txt => msg.includes(txt))) {
    result.push('+')
  }

  if (['low', 'niskie', 'błache'].some(txt => msg.includes(txt))) {
    result.push(alertLevels.low)
  }

  if (['medium', 'srednie', 'średnie'].some(txt => msg.includes(txt))) {
    result.push(alertLevels.medium)
  }

  if (['high', 'wazne', 'ważne'].some(txt => msg.includes(txt))) {
    result.push(alertLevels.high)
  }

  return result
}

function parseSubscriptionDBKey(key: string) {
  const [category, type, level] = key.replace(prefix, '').split('/')

  return {
    key: `${category}/${type}/${level}`,
    type: type === '+' ? 'all' : type,
    level: level === '+' ? 'all' : level,
  }
}

export function initSubscribe(bot: TelegramBot): void {
  bot.onText(/(.+)?show(.+)?(my)?(.+)?subscriptions/gi, async (msg: TelegramBot.Message) => {
    if (!msg.text) {
      return
    }

    const keys = await redisClient.keysAsync(`${prefix}alerts/*`)
    const subscriptions = await getSubscribersByDBKeys(keys)
    const subscribed = Object.keys(subscriptions).filter(topic => {
      return subscriptions[topic].includes(msg.chat.id + '')
    })

    if (subscribed.length === 0) {
      bot.sendMessage(msg.chat.id, 'You do not have any subscriptions')
      return
    }

    bot.sendMessage(
      msg.chat.id,
      'your subscriptions:\n' +
        subscribed
          .map((key: string, i: number) => {
            const parsed = parseSubscriptionDBKey(key)

            return `<pre>${(i += 1)}. <i>type:</i> <b>${parsed.type.padEnd(
              15,
              ' ',
            )}</b> <i>level:</i> <b>${parsed.level.padEnd(15, ' ')}</b> (${parsed.key})</pre>`
          })
          .join('\n'),
      { parse_mode: 'HTML' },
    )
  })
  bot.onText(
    /(.+)?(subscribe to|subscribe for|pokaz|pokaż|pokazuj)(.+)?(alerts|alert|alerty)(.+)?/gi,
    async (msg: TelegramBot.Message) => {
      if (!msg.text) {
        return
      }

      const txt = msg.text.toLowerCase()
      const levels = findLevels(txt)
      const types = findTypes(txt)

      if (levels.length === 0 && types.length > 0) {
        levels.push('+')
      }

      if (levels.length > 0 && types.length === 0) {
        types.push('+')
      }

      if (levels.length === 0 && types.length === 0) {
        bot.sendMessage(msg.chat.id, "Sorry I don't understand how the subscription should look like")
        return
      }

      for (const level of levels) {
        for (const type of types) {
          if ((await saveSubscriptionIfNeeded(type, level, msg.chat.id)) === false) {
            bot.sendMessage(
              msg.chat.id,
              `Subscribed to alert -> <i>type:</i> <b>${type}</b>, <i>level:</i> <b>${level}</b>`,
              {
                parse_mode: 'HTML',
              },
            )
          } else {
            bot.sendMessage(
              msg.chat.id,
              `You already have subscription for -> <i>type:</i> <b>${type}</b>, <i>level:</i> <b>${level}</b>`,
              { parse_mode: 'HTML' },
            )
          }
        }
      }
    },
  )

  bot.onText(
    /(.+)?(delete|remove|skasuj|usun|usuń)(.+)?(subscription|subscriptions|subskrypcje|)(.+)?/gi,
    async (msg: TelegramBot.Message) => {
      if (!msg.text) {
        return
      }

      const txt = msg.text.toLowerCase()
      const levels = findLevels(txt)
      const types = findTypes(txt)

      if (levels.length === 0 && types.length > 0) {
        levels.push('+')
      }

      if (levels.length > 0 && types.length === 0) {
        types.push('+')
      }

      if (levels.length === 0 && types.length === 0) {
        bot.sendMessage(msg.chat.id, "Sorry I don't understand what subscription should be deleted")
        return
      }

      for (const level of levels) {
        for (const type of types) {
          if (await deleteSubscriptionIfNeeded(type, level, msg.chat.id)) {
            bot.sendMessage(
              msg.chat.id,
              `Subscription for <i>type:</i> <b>${type}</b>, <i>level:</i> <b>${level}</b> has been removed`,
              { parse_mode: 'HTML' },
            )
          } else {
            bot.sendMessage(
              msg.chat.id,
              `You do not subscribe <i>type:</i> <b>${type}</b>, <i>level:</i> <b>${level}</b>`,
              { parse_mode: 'HTML' },
            )
          }
        }
      }
    },
  )

  subscribe('alerts/+/+', async (msg: { alert: string }, topic: string) => {
    const [, type, level] = topic.split('/')

    const subscribers = await getSubscribers({
      type,
      level,
    })

    Object.keys(subscribers).forEach(topic => {
      subscribers[topic].forEach(chatId => {
        bot.sendMessage(chatId, msg.alert)
      })
    })
  })
}
