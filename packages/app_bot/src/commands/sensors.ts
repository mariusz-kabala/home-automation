import TelegramBot from 'node-telegram-bot-api'
import config from 'config'
import * as Influx from 'influx'
import { logger } from '@home/logger'

const uri = `http://${config.get<string>('dbUser')}:${config.get<string>('dbPass')}@${config.get<string>(
  'dbHost',
)}:${config.get<string>('dbPort')}`

logger.log({
  level: 'info',
  message: `Database uri ${uri}`
})

export const influx = new Influx.InfluxDB(`${uri}/${config.get<string>('dbName')}`)

const sensorsMapper: {
  [key: string]: {
    field: string
    measurement: string,
    time: string
  }
} = {
  temperature: {
    field: 'temperature',
    measurement: 'ZHATemperature',
    time: '1h'
  },
  humidity: {
    field: 'humidity',
    measurement: 'ZHAHumidity',
    time: '1h'
  },
  pressure: {
    field: 'pressure',
    measurement: 'ZHAPressure',
    time: '3h'
  },
}

const locationMapper: {
  [key: string]: string[]
} = {
  'Kitchen Motion Sensor': ['kitchen', 'kuchnia', 'kuchni'],
  'Hallway Multi Sensor': ['hallway', 'korytarz', 'korytarzu'],
  'Bedroom Multi Sensor': ['bedroom', 'sypialnia', 'sypialni'],
  'Bathroom Multi Sensor': ['bathroom', 'lazieka', 'lazieki', 'łazięka', 'łazięki'],
}

function findDevice(message: string): string | undefined {
  for (const location of Object.keys(locationMapper)) {
    const txtes = locationMapper[location]

    if (txtes.some(txt => message.includes(txt))) {
      return location
    }
  }

  return
}

function queryBuilder(params: { type: string; device?: string; time?: string }): string {
  const { type, device } = params
  const mapper = sensorsMapper[type]
  
  if (!mapper) {
    throw new Error(`Type ${type} is not supported`)
  }

  const timeRange = params.time ?? mapper.time

  let query = ` SELECT mean("${mapper.field}")`

  if (['humidity', 'temperature'].includes(type)) {
    query += ' / 100'
  }

  query += ` FROM "${mapper.measurement}"`

  if (device) {
    query += ` WHERE ("deviceName" = '${device}')`
  }

  query += ` GROUP BY time(${timeRange}) order by time desc limit 1`

  return query
}

function getSensorAnswerFunc(type: string, unit: string, bot: TelegramBot) {
  return async (msg: TelegramBot.Message) => {
    if (!msg.text) {
      return
    }

    const chatId = msg.chat.id
    const device = findDevice(msg.text)
    const query = queryBuilder({
        type,
        device,
    })

    logger.log({
        level: 'info',
        message: `New sensor msg: ${msg.text} / query: ${query}`
    })

    try {
      const data: any = await influx.query(query)

      if (data === null) {
          logger.log({
            level: 'info',
            message: `No Data for query ${query} / msg: ${msg.text}`
          })
          bot.sendMessage(chatId, 'I do not have any data about that')
          return
      }

      bot.sendMessage(chatId, `${type.charAt(0).toUpperCase() + type.substring(1)} ${device ? `from ${device}` : ''}: ${Math.round(data[0].mean)}${unit}`)
    } catch (err) {
      logger.log({
        level: 'error',
        message: err
      })

      bot.sendMessage(chatId, 'An error occured, I was not able to collect data')
    }
  }
}

export function initSensors(bot: TelegramBot): void {
  bot.onText(/(.+)?(temperature|temperatura|temp)(.+)?(in|w\ .+)?/gi, getSensorAnswerFunc('temperature', 'C', bot))
  bot.onText(/(.+)?(humidity|wilgotność|wilgotnosc)(.+)?(in|w\ .+)?/gi, getSensorAnswerFunc('humidity', '%', bot))
  bot.onText(/(.+)?(pressure|cisnienie|ciśnienie)(.+)?(in|w\ .+)?/gi, getSensorAnswerFunc('pressure', 'hPa', bot))
}
