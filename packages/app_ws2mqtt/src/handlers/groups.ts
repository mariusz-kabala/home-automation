import { logger } from '@home/logger'
import { fetchGroups, fetchGroupDetails, IGroup } from '@home/deconz-api'
import { publish } from '@home/mqtt'
import config from 'config'
import cron from 'node-cron'

import { IWSGroupMsg } from '../types'

async function fetchGroupsDetails() {
  const groups = await fetchGroups()

  return await Promise.all(Object.keys(groups).map(group => fetchGroupDetails(group))).then(all =>
    all.reduce((response: { [groupId: string]: IGroup }, group) => {
      response[group.id] = group

      return response
    }, {}),
  )
}

function publishGroupsInfo(initial = false) {
  fetchGroupsDetails()
    .then(groups => {
      publish(`${config.get<string>('namespace')}/groups`, groups, { retain: true, qos: 0 })
      if (initial) {
        for (const id of Object.keys(groups)) {
          publish(`${config.get<string>('namespace')}/groups/${id}`, groups[id], { retain: true, qos: 0 })
        }
      }
    })
    .catch(err => {
      logger.log({
        level: 'error',
        message: `Can not fetch info about groups ${err}`,
      })
    })
}

publishGroupsInfo(true)

cron.schedule('*/5 * * * *', publishGroupsInfo)

export function handleGroupMsg(msg: IWSGroupMsg) {
  switch (msg.e) {
    case 'changed':
      return fetchGroupDetails(msg.id)
        .then(group =>
          publish(`${config.get<string>('namespace')}/groups/${group.id}`, group, { retain: true, qos: 0 }),
        )
        .catch(err => {
          logger.log({
            level: 'error',
            message: `Can not fetch info about group ${msg.id} / ${err}`,
          })
        })
    case 'added':
      return publishGroupsInfo()
    default:
      return logger.log({
        traceid: msg.uniqueid,
        level: 'error',
        message: `Not supported group message: ${JSON.stringify(msg)}`,
      })
  }
}
