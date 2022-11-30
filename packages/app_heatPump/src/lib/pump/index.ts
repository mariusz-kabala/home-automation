import fetch from 'node-fetch'
import { HeatPumpModel, HeatPumpErrorModel } from '@home/models'
import { logger } from '@home/logger'
import { sensorsWriteApi } from '../influxDb/client'
import { Point } from '@influxdata/influxdb-client'
import { IHeatPumpStatusResponse } from './interfaces'
import { parseStatus, IParsedStatus, getError } from './parser'

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
        Persist: false,
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

  public async sendCommand(status: IHeatPumpStatusResponse): Promise<IHeatPumpStatusResponse> {
    return await fetch(`${CLOUD_URL}/Device/SetAtw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-mitscontextkey': this.contextKey,
      },
      body: JSON.stringify(status),
    }).then(res => res.json())
  }

  public async refreshStatus(): Promise<boolean> {
    return await fetch(`${CLOUD_URL}/Device/RequestRefresh?id=${DEVICE_ID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-mitscontextkey': this.contextKey,
      },
    })
      .then(res => res.text())
      .then(result => (result === 'true' ? true : false))
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

  private async off(retry = 0, status?: IHeatPumpStatusResponse): Promise<void> {
    if (retry > 4) {
      throw new Error('Can not power off heat pump')
    }

    if (!status) {
      status = await this.getStatus()
    }

    if (status.Power === false) {
      return
    }

    status.Power = false

    await this.sendCommand(status)

    const newStatus = await this.getStatus()

    if (newStatus.Power !== false) {
      return this.off(retry + 1, newStatus)
    }
  }

  private async on(retry = 0, status?: IHeatPumpStatusResponse): Promise<void> {
    if (retry > 4) {
      throw new Error('Can not power on heat pump')
    }

    if (!status) {
      status = await this.getStatus()
    }

    if (status.Power === true) {
      return
    }

    status.Power = true

    await this.sendCommand(status)

    const newStatus = await this.getStatus()

    if (newStatus.Power !== true) {
      return this.on(retry + 1, newStatus)
    }
  }

  private async offOn() {
    await this.off()
    await this.on()
  }

  public async reset(retry = false) {
    logger.log({
      level: 'info',
      message: 'Starting heat pump reset procedure',
    })

    try {
      await this.offOn()
    } catch (err) {
      if (retry === false) {
        logger.log({
          level: 'error',
          message: 'Heat pump restart failed, retry in 15sec',
        })

        setTimeout(() => this.reset(true), 15000) // 15sec
      } else {
        logger.log({
          level: 'error',
          message: 'Second attempt to restart heat pump failed',
        })
      }
    }
  }

  public async checkForErrors(status?: IHeatPumpStatusResponse) {
    if (!status) {
      status = await this.getStatus()
    }

    const parsedError = getError(status)

    if (!parsedError) {
      return
    }

    const error = new HeatPumpErrorModel()

    error.error = parsedError.error
    error.message = parsedError.message

    try {
      await error.save()
    } catch (err) {
      logger.log({
        level: 'error',
        message: `Error saving to database failed, error: ${err}`,
      })
    }

    this.reset()
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

  public async updateEnergyReport(day: number, month: number, year: number) {
    const date = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}T00:00:00`
    const report = await fetch(`${CLOUD_URL}/EnergyCost/Report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-mitscontextkey': this.contextKey,
      },
      body: JSON.stringify({
        DeviceId: DEVICE_ID,
        FromDate: date,
        ToDate: date,
        UseCurrency: false,
      }),
    }).then(res => res.json())

    const water = report.HotWater[0]
    const heating = report.Heating[0]
    const producedWater = report.ProducedHotWater[0]
    const producedHeating = report.ProducedHeating[0]
    const responseDay = report.Labels[0]

    const point = new Point('energy')
      .tag('deviceName', 'heatPump')
      .floatField('water', water)
      .floatField('heating', heating)
      .floatField('producedWater', producedWater)
      .floatField('producedHeating', producedHeating)
      .timestamp(new Date(`${month} ${responseDay} ${year}`)) // to keep the same format as in jenkins task

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
}
