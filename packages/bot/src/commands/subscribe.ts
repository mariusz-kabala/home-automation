import TelegramBot from 'node-telegram-bot-api'
import { redisClient } from '@home/redis'

async function subscribe(msg: TelegramBot.Message) {
    if (!msg.text) {
        return
    }

    const levels = findLevel(msg.text)
    const key = `hal9000-subscription-${msg.chat.id}`

    const subscriptions = await redisClient.get(key)

    
}

function unsubscribe(msg: string) {

}

function findLevel(msg: string): {
    low: boolean,
    medium: boolean,
    high: boolean,
    all: boolean
} {
    const result = {
        low: false,
        medium: false,
        high: false,
        all: true
    }

    if (['all', 'wszystkie', 'wszystko'].some(txt => msg.includes(txt))) {
        return result
    }

    if (['low', 'niskie', 'błache'].some(txt => msg.includes(txt))) {
        result.low = true
    }

    if (['medium', 'srednie', 'średnie'].some(txt => msg.includes(txt))) {
        result.medium = true
    }

    if (['high', 'wazne', 'ważne'].some(txt => msg.includes(txt))) {
        result.high = true
    }

    return result
}

export function initSubscribe(bot: TelegramBot): void {
    bot.onText(/(.+)?(subscribe for|pokaz|pokaż|pokazuj)(.+)?(alerts|alert|alerty)(.+)?/g, async msg => {
    })
}
