import TelegramBot from 'node-telegram-bot-api'
import config from 'config'
import * as Influx from 'influx'
import { logger } from '@home/logger'

const uri = `http://${config.get<string>('dbUser')}:${config.get<string>('dbPass')}@${config.get<string>(
  'dbHost',
)}:${config.get<string>('dbPort')}`
export const influx = new Influx.InfluxDB(`${uri}/${config.get<string>('dbName')}`)


const sensorsMapper: {
  [key: string]: {
    field: string
    measurement: string
  }
} = {
  temperature: {
    field: 'temperature',
    measurement: 'ZHATemperature',
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
  const { type, device, time = '1h' } = params
  const mapper = sensorsMapper[type]

  if (!mapper) {
    throw new Error(`Type ${type} is not supported`)
  }

  let query = ` SELECT mean("${mapper.field}")`

  if (type === 'temperature') {
    query += ' / 100'
  }

  query += ` FROM "${mapper.measurement}"`

  if (device) {
    query += ` WHERE ("deviceName" = '${device}')`
  }

  query += ` GROUP BY time(${time}) order by time desc limit 1`

  return query
}

export function initSensors(bot: TelegramBot): void {
  bot.onText(/(.+)?(temperature|temperatura|temp)(.+)?(in|w\ .+)?/g, async (msg) => {
    if (!msg.text) {
      return
    }

    const chatId = msg.chat.id
    const device = findDevice(msg.text)
    const query = queryBuilder({
        type: 'temperature',
        device,
    })

    logger.log({
        level: 'info',
        message: `msg: ${msg.text} / query: ${query}`
    })

    const data: any = await influx.query(query)

    if (data === null) {
        bot.sendMessage(chatId, 'I do not have any data about that');
    }

    bot.sendMessage(chatId, `Temperature ${device ? `from ${device}` : ''}: ${Math.round(data[0].mean)}C`)
  })
}
