import { subscribe } from '@home/mqtt'
import { logger } from '@home/logger'
import { Point } from '@influxdata/influxdb-client'

import { sensorsWriteApi } from '../clients/db'

interface ITuyaPlugMsg {
  isOn?: boolean
  electric?: number
  power?: number
  voltage?: number
}

export function subscribeForPlugReports() {
  subscribe('tuyaPlugs/+/status', async (msg: ITuyaPlugMsg, topic: string) => {
    const [, device] = topic.split('/')
    const { isOn, electric, power, voltage } = msg

    const point = new Point('tuyaPlug').tag('device', device)

    if (typeof isOn !== 'undefined') {
      point.booleanField('isOn', isOn)
    }

    if (typeof electric !== 'undefined') {
      point.intField('electric', electric)
    }

    if (typeof power !== 'undefined') {
      point.intField('power', power)
    }

    if (typeof voltage !== 'undefined') {
      point.intField('voltage', voltage)
    }

    sensorsWriteApi.writePoint(point)

    try {
      await sensorsWriteApi.flush()
    } catch (err) {
      logger.log({
        level: 'error',
        message: err,
      })
    }
  })
}
