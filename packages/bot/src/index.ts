import TelegramBot from 'node-telegram-bot-api'
import config from 'config'
import { initSensors } from './commands/sensors'
import { initLgTv } from './commands/lgtv'
import { logger } from '@home/logger'
import express from 'express'
import bodyParser from 'body-parser'

const env = config.get<string>('env')
const options = env === 'production' ? {
    webhook: {
        port: 443
    },
    polling: false
} : {
    polling: true
}

const bot = new TelegramBot(config.get<string>('telegramToken'), options)
const app = express()

app.use(bodyParser.json())

app.post(`/bots/hal9000/${config.get<string>('telegramToken')}`, (req, res) => {
    bot.processUpdate(req.body)
    res.sendStatus(200)
})

if (env === 'production') {
    bot.setWebHook(`${config.get<string>('webHookUrl')}/${config.get<string>('telegramToken')}`)
}

initSensors(bot)
initLgTv(bot)

logger.log({
    level: 'info',
    message: 'Bot HAL 9000 started'
})

app.listen(config.get<string>('httpPort'), () => {
    logger.log({
        level: 'info',
        message: `Express server is listening on port ${config.get<string>('httpPort')}`
    })
})

bot.on('message', (msg) => {
    logger.log({
        level: 'info',
        message: `New telegram message ${JSON.stringify(msg)}`
    })
})
