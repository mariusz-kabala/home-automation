import mongoose, { Schema, Document } from 'mongoose'

export interface IHeatPump extends Document {
  deviceId: number
  buildingId: number
  ecoHotWater: boolean
  forcedHotWaterMode: boolean
  holidayMode: boolean
  lastCommunication: string
  outdoorTemperature: number
  power: boolean
  offline: boolean
  zones: {
    name: string
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

const HeatPumpSchema = new Schema({
  deviceId: {
    type: Number,
    required: true,
  },
  buildingId: {
    type: Number,
    required: true,
  },
  ecoHotWater: {
    type: Boolean,
  },
  forcedHotWaterMode: {
    type: Boolean,
  },
  holidayMode: {
    type: Boolean,
  },
  lastCommunication: {
    type: String,
  },
  outdoorTemperature: {
    type: Number,
  },
  power: {
    type: Boolean,
  },
  offline: {
    type: Boolean,
  },
  zones: [
    {
      name: {
        type: String,
      },
      idle: {
        type: Boolean,
      },
      prohibit: {
        type: Boolean,
      },
      operationMode: {
        type: Number,
      },
      temperature: {
        type: Number,
      },
      setCoolFlow: {
        type: Number,
      },
      setHeatFlow: {
        type: Number,
      },
      setTemperature: {
        type: Number,
      },
    },
  ],
  water: {
    prohibit: {
      type: Boolean,
    },
    temperature: {
      type: Number,
    },
    setTemperature: {
      type: Number,
    },
  },
})

export const HeatPumpModel = mongoose.model<IHeatPump>('HeatPump', HeatPumpSchema)
