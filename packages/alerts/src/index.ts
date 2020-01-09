import { subscribe, publish } from '@home/mqtt'
import { logger } from '@home/logger'
import config from 'config'
import crypto from 'crypto'

// eq - is equal to
// ne - is not equal to
// gt - is greater than
// ge - is greater than or equal to
// lt - is less than
// le - is less than or equal to
interface ISensorRule {
  field: string
  condition: 'eq' | 'ne' | 'gt' | 'ge' | 'lt' | 'le'
  value: number
  level: 'low' | 'medium' | 'high'
  alert: string
  timeout: number
}

const hash: crypto.Hash = crypto.createHash('sha1')

const recentAlerts: {
  [key: string]: number
} = {}

function checkCondition(
  value: number,
  expectedValue: number,
  condition: 'eq' | 'ne' | 'gt' | 'ge' | 'lt' | 'le',
): boolean {
  switch (condition) {
    case 'eq':
      return value == expectedValue
    case 'ne':
      return value != expectedValue
    case 'gt':
      return value > expectedValue
    case 'ge':
      return value >= expectedValue
    case 'lt':
      return value < expectedValue
    case 'le':
      return value <= expectedValue
  }
}

const sensorsRules = config.get<{
  [key: string]: ISensorRule[]
}>('rules')

subscribe('sensors/+', (msg: any) => {
  const sensorsToWatch = Object.keys(sensorsRules)

  const { state, name } = msg

  if (!sensorsToWatch.includes(name)) {
    return
  }

  for (const rule of sensorsRules[name]) {
    if (state[rule.field] && !checkCondition(state[rule.field], rule.value, rule.condition)) {
      const alertHash = hash
        .update(
          JSON.stringify({
            name,
            ...rule,
          }),
        )
        .digest('base64')
      const now = new Date()
      const topic = `alert/${rule.level}`

      if (recentAlerts[alertHash] && recentAlerts[alertHash] + rule.timeout < now.getTime()) {
        logger.log({
          level: 'info',
          message: `skipping a new alert ${topic} : ${rule.alert} duo not reaching the timeout ${rule.timeout}, last occurrence: ${recentAlerts[alertHash]}`,
          alertLevel: rule.level,
        })
        return
      }

      recentAlerts[alertHash] = now.getTime()

      publish(topic, { alert: rule.alert })

      logger.log({
        level: 'info',
        message: `publishing a new alert ${topic} : ${rule.alert}`,
        alertLevel: rule.level,
      })
    }
  }
})
