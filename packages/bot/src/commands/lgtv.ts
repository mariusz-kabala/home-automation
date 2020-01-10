import TelegramBot from 'node-telegram-bot-api'
import { subscribe, publish } from '@home/mqtt'
import { logger } from '@home/logger'

const devicesStatus: {
  [device: string]: boolean
} = {}

function findDevice(msg: string): string | false {
  const devices = Object.keys(devicesStatus)

  for (const device of devices) {
    if (msg.includes(device)) {
      return device
    }
  }

  for (const device of devices) {
    if (devicesStatus[device]) {
      return device
    }
  }

  return false
}

export function initLgTv(bot: TelegramBot): void {
  subscribe('tv/+/status', (msg: { isOn: boolean }, topic: string) => {
    const topicArr = topic.split('/')

    devicesStatus[topicArr[1]] = msg.isOn

    logger.log({
      level: 'info',
      message: `Got device status ${topicArr[1]}: ${msg.isOn}`,
    })
  })

  bot.onText(/(.+)?(turn off|wylacz|wyłącz) tv(.+)?(in|w\ .+)?/g, async msg => {
    if (!msg.text) {
      return
    }

    const device = findDevice(msg.text)
    const chatId = msg.chat.id

    if (!device) {
      logger.log({
        level: 'error',
        message: `Not able to find device in message: ${msg.text}`,
      })

      bot.sendMessage(chatId, "I don't know that device")
      return
    }

    if (!devicesStatus[device]) {
      bot.sendMessage(chatId, 'According to my best knowledge this device is already off')
      return
    }

    publish(`tv/${device}/turnOff`, {})

    bot.sendMessage(chatId, 'done')
  })

  bot.onText(/(.+)?(turn on|wlacz|włącz) netflix(.+)?(in|w\ .+)?/g, async msg => {
    if (!msg.text) {
      return
    }

    const device = findDevice(msg.text)
    const chatId = msg.chat.id

    if (!device) {
      logger.log({
        level: 'error',
        message: `Not able to find device in message: ${msg.text}`,
      })

      bot.sendMessage(chatId, "I don't know that device")
      return
    }

    if (!devicesStatus[device]) {
      bot.sendMessage(chatId, 'According to my best knowledge device is off, can not do it')
      return
    }

    publish(`tv/${device}/lunchApp`, { app: 'netflix' })

    bot.sendMessage(chatId, 'done')
  })

  bot.onText(/(.+)?(turn on|wlacz|włącz) youtube(.+)?(in|w\ .+)?/g, async msg => {
    if (!msg.text) {
      return
    }

    const device = findDevice(msg.text)
    const chatId = msg.chat.id

    if (!device) {
      logger.log({
        level: 'error',
        message: `Not able to find device in message: ${msg.text}`,
      })

      bot.sendMessage(chatId, "I don't know that device")
      return
    }

    if (!devicesStatus[device]) {
      bot.sendMessage(chatId, 'According to my best knowledge device is off, can not do it')
      return
    }

    publish(`tv/${device}/lunchApp`, { app: 'youtube' })

    bot.sendMessage(chatId, 'done')
  })

  bot.onText(/(.+)?(turn on|wlacz|włącz) hbo(.+)?(in|w\ .+)?/g, async msg => {
    if (!msg.text) {
      return
    }

    const device = findDevice(msg.text)
    const chatId = msg.chat.id

    if (!device) {
      logger.log({
        level: 'error',
        message: `Not able to find device in message: ${msg.text}`,
      })

      bot.sendMessage(chatId, "I don't know that device")
      return
    }

    if (!devicesStatus[device]) {
      bot.sendMessage(chatId, 'According to my best knowledge device is off, can not do it')
      return
    }

    publish(`tv/${device}/lunchApp`, { app: 'hbo' })

    bot.sendMessage(chatId, 'done')
  })

  bot.onText(
    /(.+)?(stop|zatrzymaj|zastopuj)(.+)?(film|movie|video|music|netflix|hbo|tv)(.+)?(in|w\ .+)?/g,
    async msg => {
      if (!msg.text) {
        return
      }

      const device = findDevice(msg.text)
      const chatId = msg.chat.id

      if (!device) {
        logger.log({
          level: 'error',
          message: `Not able to find device in message: ${msg.text}`,
        })

        bot.sendMessage(chatId, "I don't know that device")
        return
      }

      if (!devicesStatus[device]) {
        bot.sendMessage(chatId, 'According to my best knowledge device is off, can not do it')
        return
      }

      publish(`tv/${device}/pause`, {})

      bot.sendMessage(chatId, 'done')
    },
  )

  bot.onText(
    /(.+)?(resume|play|wznow|wznów)(.+)?(film|movie|video|music|netflix|hbo|tv)(.+)?(in|w\ .+)?/g,
    async msg => {
      if (!msg.text) {
        return
      }

      const device = findDevice(msg.text)
      const chatId = msg.chat.id

      if (!device) {
        logger.log({
          level: 'error',
          message: `Not able to find device in message: ${msg.text}`,
        })

        bot.sendMessage(chatId, "I don't know that device")
        return
      }

      if (!devicesStatus[device]) {
        bot.sendMessage(chatId, 'According to my best knowledge device is off, can not do it')
        return
      }

      publish(`tv/${device}/play`, {})

      bot.sendMessage(chatId, 'done')
    },
  )
}
