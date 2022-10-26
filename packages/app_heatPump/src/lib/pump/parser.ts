import { IHeatPumpStatusResponse } from './interfaces'

export interface IParsedStatus {
  ecoHotWater: boolean
  operationMode: number
  forcedHotWaterMode: boolean
  holidayMode: boolean
  lastCommunication: string
  outdoorTemperature: number
  power: boolean
  offline: boolean
  zones: {
    name: string | null
    idle: boolean
    prohibit: boolean
    operationMode: number
    temperature: number
    setCoolFlow: number
    setHeatFlow: number
    setTemperature: number
  }[]
  water: {
    prohibit: boolean
    temperature: number
    setTemperature: number
  }
}

export function parseStatus(status: IHeatPumpStatusResponse): IParsedStatus {
  return {
    operationMode: status.OperationMode,
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
        idle: status.IdleZone1,
        prohibit: status.ProhibitZone1,
        operationMode: status.OperationModeZone1,
        temperature: status.RoomTemperatureZone1,
        setCoolFlow: status.SetCoolFlowTemperatureZone1,
        setHeatFlow: status.SetHeatFlowTemperatureZone1,
        setTemperature: status.SetTemperatureZone1,
      },
      {
        name: status.Zone2Name,
        idle: status.IdleZone2,
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
  }
}
