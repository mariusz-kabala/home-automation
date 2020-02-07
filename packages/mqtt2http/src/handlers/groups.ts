import { subscribe } from '@home/mqtt'
import { logger } from '@home/logger'
import { setGroupState, fetchGroupDetails, GroupStateFields, IGroupState } from '@home/deconz-api'
import config from 'config'

async function fetchCurrentGroupState(id: string) {
  try {
    const group = await fetchGroupDetails(id)

    return group.action
  } catch (err) {
    logger.log({
      level: 'error',
      message: `Can not fetch state of group ${id}: ${err}`,
    })

    return null
  }
}

async function turnOnGroup(id: string) {
  try {
    await setGroupState(id, {
      [GroupStateFields.on]: true,
    })
  } catch (err) {
    logger.log({
      level: 'error',
      message: `Error during turning on group ${id}: ${err}`,
    })
    return
  }

  logger.log({
    level: 'info',
    message: `Group ${id} turned on`,
  })
}

async function turnOffGroup(id: string) {
  try {
    await setGroupState(id, {
      [GroupStateFields.on]: false,
    })
  } catch (err) {
    logger.log({
      level: 'error',
      message: `Error during turning off group ${id}: ${err}`,
    })
    return
  }

  logger.log({
    level: 'info',
    message: `Group ${id} turned off`,
  })
}

async function changeGroupBrightness(id: string, increase = false) {
  const state = await fetchCurrentGroupState(id)

  if (state === null) {
    return
  }

  const { bri = 255 } = state

  if (bri < 26 && increase === false) {
    turnOffGroup(id)
    return
  }

  if (bri >= 255 && increase === true) {
    return
  }

  const step = 25
  const newBri = Math.round(increase ? bri + step : bri - step)
  const value = newBri >= 255 ? 255 : newBri
  try {
    await setGroupState(id, {
      [GroupStateFields.on]: true,
      [GroupStateFields.bri]: value,
    })
  } catch (err) {
    logger.log({
      level: 'error',
      message: `Error during changing brightness of group ${id}: ${err}`,
    })
    return
  }

  logger.log({
    level: 'info',
    message: `Brightness group ${id} changed to ${value}`,
  })
}

export function subscribeForGroupsMessages() {
  subscribe(`${config.get<string>('namespace')}/groups/+/set`, async (msg: IGroupState, topic: string) => {
    const [, , groupId] = topic.split('/')

    try {
      await setGroupState(groupId, msg)
    } catch (err) {
      logger.log({
        level: 'error',
        message: `Error during chaning group state ${groupId}: ${err}`,
      })
      return
    }

    logger.log({
      level: 'info',
      message: `Group ${groupId} state changed ${JSON.stringify(msg)}`,
    })
  })

  subscribe(`${config.get<string>('namespace')}/groups/+/toggle`, async (_msg, topic: string) => {
    const [, , groupId] = topic.split('/')

    try {
      await setGroupState(groupId, {
        [GroupStateFields.toggle]: true,
      })
    } catch (err) {
      logger.log({
        level: 'error',
        message: `Error during toggling group ${groupId}: ${err}`,
      })
      return
    }

    logger.log({
      level: 'info',
      message: `Group ${groupId} toggled`,
    })
  })

  subscribe(`${config.get<string>('namespace')}/groups/+/turnOn`, (_msg, topic: string) => {
    const [, , groupId] = topic.split('/')

    turnOnGroup(groupId)
  })

  subscribe(`${config.get<string>('namespace')}/groups/+/turnOff`, (_msg, topic: string) => {
    const [, , groupId] = topic.split('/')

    turnOffGroup(groupId)
  })

  subscribe(`${config.get<string>('namespace')}/groups/+/dim`, (_msg, topic: string) => {
    const [, , groupId] = topic.split('/')

    changeGroupBrightness(groupId, false)
  })

  subscribe(`${config.get<string>('namespace')}/groups/+/lighten`, (_msg, topic: string) => {
    const [, , groupId] = topic.split('/')

    changeGroupBrightness(groupId, true)
  })
}
