export interface IDevice {
    name: string;
    id: string;
    key: string; 
}

export interface IDevicePayload {
    devId: string
    dps: {
        '1'?: boolean // isOn
        '18'?: number // Current ele (mA)
        '19'?: number // Current power (W)
        '20'?: number // Current voltage (V)
     }
    t: number
    s: number
}
