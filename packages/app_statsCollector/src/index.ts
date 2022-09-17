import { logger } from '@home/logger'
import { subscribe } from '@home/mqtt'
import config from 'config'
import { registerInConsul } from '@home/consul'
import { client } from './clients/db'
import { Point } from '@influxdata/influxdb-client'

interface Topic {
  topic: string
  device: string
  bucket: string
  field?: string
}

const topics = config.get<Topic[]>('topics')

function writeToPoint(point: Point, value: any, name = 'value') {
  switch (typeof value) {
    case 'string':
      point.stringField(name, value)
      break

    case 'number':
      point.intField(name, value)
      break

    case 'boolean':
      point.booleanField(name, value)
      break

    default:
      break
  }
}

async function onMessage(payload: any, topic: string) {
  const setup = topics.find(record => record.topic === topic)

  if (!setup) {
    logger.log({
      level: 'error',
      message: `Not supported topic: ${topic}, skipping`,
    })
    return
  }

  const writeAPI = client.getWriteApi(config.get<string>('organisation'), setup.bucket, 'ms')

  if (setup.field) {
    const point = new Point(setup.field).tag('deviceName', setup.device)
    writeToPoint(point, payload)

    writeAPI.writePoint(point)
  } else {
    for (const field of Object.keys(payload)) {
      const point = new Point(field).tag('deviceName', setup.device)
      writeToPoint(point, payload[field])

      writeAPI.writePoint(point)
    }
  }

  try {
    await writeAPI.flush()
  } catch (err) {
    logger.log({
      level: 'error',
      message: `${err}`,
    })
  }
}

function start() {
  logger.log({
    level: 'info',
    message: 'Application started',
  })

  for (const topic of topics) {
    subscribe(topic.topic, onMessage)
    logger.log({
      level: 'info',
      message: `Subscribed to ${topic.topic}`,
    })
  }
}

registerInConsul('statsCollector')
start()
