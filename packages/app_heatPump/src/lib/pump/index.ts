import fetch from 'node-fetch'
import { IHeatPump, HeatPumpModel } from '@home/models'
import { logger } from '@home/logger'
import { sensorsWriteApi } from '../influxDb/client'
import { Point } from '@influxdata/influxdb-client'

const CLOUD_URL = 'https://app.melcloud.com/Mitsubishi.Wifi.Client'

const APP_VERSION = '1.25.0.1'

const DEVICE_ID = 28328216

const BUILDING_ID = 343859

export interface IHeatPumpStatusResponse {
  DemandPercentage: number
  DeviceID: number
  DeviceType: number
  EcoHotWater: boolean
  EffectiveFlags: number
  ErrorCode: number
  ErrorMessage: string | null
  ForcedHotWaterMode: boolean
  HCControlType: number
  HasPendingCommand: boolean
  HolidayMode: boolean
  IdleZone1: boolean
  IdleZone2: boolean
  LastCommunication: string
  LocalIPAddress: null | string
  NextCommunication: string
  Offline: boolean
  OperationMode: number
  OperationModeZone1: number
  OperationModeZone2: number
  OutdoorTemperature: number
  Power: boolean
  ProhibitHotWater: boolean
  ProhibitZone1: boolean
  ProhibitZone2: boolean
  RoomTemperatureZone1: number
  RoomTemperatureZone2: number
  Scene: null | string
  SceneOwner: null | string
  SetCoolFlowTemperatureZone1: number
  SetCoolFlowTemperatureZone2: number
  SetHeatFlowTemperatureZone1: number
  SetHeatFlowTemperatureZone2: number
  SetTankWaterTemperature: number
  SetTemperatureZone1: number
  SetTemperatureZone2: number
  TankWaterTemperature: number
  TemperatureIncrementOverride: number
  UnitStatus: number
  Zone1Name: string | null
  Zone2Name: string | null
}

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

    await HeatPumpModel.findOneAndUpdate(
      {
        deviceId: DEVICE_ID,
        buildingId: BUILDING_ID,
      },
      {
        ecoHotWater: status.EcoHotWater,
        forcedHotWaterMode: status.ForcedHotWaterMode,
        holidayMode: status.HolidayMode,
        lastCommunication: status.LastCommunication,
        outdoorTemperature: status.OutdoorTemperature,
        power: status.Power,
        offline: status.Offline,
        zones: [
          {
            name: status.Zone1Name,
            ide: status.IdleZone1,
            prohibit: status.ProhibitZone1,
            operationMode: status.OperationModeZone1,
            temperature: status.RoomTemperatureZone1,
            setCoolFlow: status.SetCoolFlowTemperatureZone1,
            setHeatFlow: status.SetHeatFlowTemperatureZone1,
            setTemperature: status.SetTemperatureZone1,
          },
          {
            name: status.Zone2Name,
            ide: status.IdleZone2,
            prohibit: status.ProhibitZone2,
            operationMode: status.OperationModeZone2,
            temperature: status.RoomTemperatureZone2,
            setCoolFlow: status.SetCoolFlowTemperatureZone2,
            setHeatFlow: status.SetHeatFlowTemperatureZone2,
            setTemperature: status.SetTemperatureZone2,
          },
        ],
        water: {
          prohibit: status.ProhibitHotWater,
          temperature: status.TankWaterTemperature,
          setTemperature: status.SetTankWaterTemperature,
        },
      },
      {
        new: true,
      },
    )
  }
}
