import config from 'config'
import { IRule } from '../types'
import { checkCondition, createHash } from '../helpers'
import { subscribe, publish } from '@home/mqtt'
import { logger } from '@home/logger'

const recentAlerts: {
  [key: string]: number
} = {}

const sensorsRules = config.get<{
  [key: string]: IRule[]
}>('sensorRules')

export function sensorsAlerts() {
  subscribe('sensors/+', (msg: any) => {
    const sensorsToWatch = Object.keys(sensorsRules)

    const { state, name } = msg

    if (!sensorsToWatch.includes(name)) {
      return
    }

    for (const rule of sensorsRules[name]) {
      if (state[rule.field] && checkCondition(state[rule.field], rule.value, rule.condition)) {
        const alertHash = createHash()
          .update(
            JSON.stringify({
              name,
              ...rule,
            }),
          )
          .digest('base64')
        const now = new Date()
        const topic = `alert/sensors/${rule.level}`

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
