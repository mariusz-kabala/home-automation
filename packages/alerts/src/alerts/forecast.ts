import config from 'config'
import { IRule } from '../types'
import { checkCondition, hash } from '../helpers'
import { subscribe, publish } from '@home/mqtt'
import { logger } from '@home/logger'

const recentAlerts: {
  [key: string]: number
} = {}

const rules = config.get<{
  [key: string]: IRule[]
}>('forecastRules')

export function forecastAlerts() {
  subscribe('forecast/+', (msg: any) => {
    const citiesToWatch = Object.keys(rules)

    const { main, name } = msg

    if (!citiesToWatch.includes(name)) {
      return
    }

    for (const rule of rules[name]) {
      if (main[rule.field] && !checkCondition(main[rule.field], rule.value, rule.condition)) {
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
}
