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
