import { UsageModel, UsageRuleModel, IUsage, IUsageRule } from '@home/models'
import { logger } from '@home/logger'
import { rClient } from './redis'

export async function checkRule(usage: IUsage, rule: IUsageRule) {
  const now = Date.now()
  const onFor = (now - Date.parse(`${usage.createdAt}`)) / 60000

  if (onFor >= rule.max + rule.threshold) {
    // turn off device
  } else if (onFor >= rule.max) {
    logger.info(`Device ${usage.name} is on loger than ${rule.max}min. currently on for ${onFor} min`)
    // send notification
    // disable notifications for now + rule.threshold using redis
    const redisKey = `rule-${rule._id}`
    rClient.set(redisKey, 'true')
    const time = (rule.max + rule.threshold ?? 0) - now
    // console.log(time, rule.max, rule.threshold ?? 0, now)
    // rClient.expire(redisKey, )
  }
}

async function checkUsage() {
  const inUse = await UsageModel.find({})

  if (inUse.length === 0) {
    return
  }

  const ids = inUse.reduce((all: any, usage) => {
    all[usage.id] = usage.toObject()

    return all
  }, {})

  const rules = await UsageRuleModel.find({
    id: {
      $in: inUse.map(usage => usage.id),
    },
  })

  //   console.log(ids)
  //   console.log(rules)

  for (const rule of rules) {
    checkRule(ids[rule.id], rule.toObject())
  }
}

export async function start() {
  await checkUsage()

  setInterval(checkUsage, 30000) // 30s
}
