import fetch from 'node-fetch'
import { HeatPumpModel } from '@home/models'
import { logger } from '@home/logger'
import { sensorsWriteApi } from '../influxDb/client'
import { Point } from '@influxdata/influxdb-client'
import { IHeatPumpStatusResponse } from './interfaces'
import { parseStatus, IParsedStatus } from './parser'

const CLOUD_URL = 'https://app.melcloud.com/Mitsubishi.Wifi.Client'

const APP_VERSION = '1.25.0.1'

const DEVICE_ID = 28328216

const BUILDING_ID = 343859
export class HeatPump {
  private username: string
  private password: string
  private contextKey = ''

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }

  public async login() {
    const response = await fetch(`${CLOUD_URL}/Login/ClientLogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: this.username,
        Password: this.password,
        Language: 0,
        AppVersion: APP_VERSION,
        Persist: true,
        CaptchaResponse: null,
      }),
    }).then(res => res.json())

    const {
      LoginData: { ContextKey },
    } = response

    this.contextKey = ContextKey
  }

  public async getStatus(): Promise<IHeatPumpStatusResponse> {
    return await fetch(`${CLOUD_URL}/Device/Get?id=${DEVICE_ID}&buildingID=${BUILDING_ID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-mitscontextkey': this.contextKey,
      },
    }).then(res => res.json())
  }

  public async updateStatsDB(status?: IHeatPumpStatusResponse) {
    if (!status) {
      status = await this.getStatus()
    }

    const point = new Point('temperature')
      .tag('deviceName', 'heatPump')
      .intField('outdoor', status.OutdoorTemperature)
      .intField('zone1', status.RoomTemperatureZone1)
      .intField('zone2', status.RoomTemperatureZone2)
      .intField('water', status.TankWaterTemperature)
      .intField('setWater', status.SetTankWaterTemperature)
      .intField('setZone1', status.SetTemperatureZone1)
      .intField('setZone2', status.SetTemperatureZone2)

    sensorsWriteApi.writePoint(point)

    try {
      await sensorsWriteApi.flush()
    } catch (err) {
      logger.log({
        level: 'error',
        message: `Stats database error ${err}`,
      })
    }
  }

  public async updateDB(status?: IHeatPumpStatusResponse) {
    if (!status) {
      status = await this.getStatus()
    }

    let device = await HeatPumpModel.findOneAndUpdate(
      {
        deviceId: DEVICE_ID,
        buildingId: BUILDING_ID,
      },
      parseStatus(status),
    )

    if (!device) {
      device = await HeatPumpModel.create({
        ...parseStatus(status),
        deviceId: DEVICE_ID,
        buildingId: BUILDING_ID,
      })
    }

    return device?.toObject() as IParsedStatus
  }
}
