import mongoose, { Schema, Document } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

export enum ShellyType {
  shelly1 = 'SHSW-1',
  shellyswitch25 = 'SHSW-25',
  shelly1pm = 'SHSW-PM',
}

export enum ShellyCategory {
  lights = 'lights',
  blinds = 'blinds',
  button = 'button',
}

export enum ConnectionStatus {
  unknown = 'unknown',
  connected = 'connected',
  disconnected = 'disconnected',
}

const ShellySchema = new Schema(
  {
    label: {
      type: String,
      trim: true,
      required: false,
    },
    hostname: {
      type: String,
      trim: true,
      required: false,
    },
    type: {
      type: String,
      trim: true,
      required: false,
    },
    name: {
      type: String,
      trim: true,
      required: false,
    },
    macAddress: {
      type: String,
      trim: true,
      required: false,
    },
    deviceId: {
      type: String,
      trim: true,
      required: false,
    },
    usage: {
      isOn: Boolean,
      lastUpdate: Date,
    },
    networks: [
      {
        wifi: {
          type: String,
          trim: true,
          required: true,
        },
        address: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      trim: true,
      required: false,
    },
    room: {
      type: String,
      trim: true,
      required: false,
    },
    level: {
      type: Number,
      required: false,
      default: 0,
    },
    mqttStatus: {
      type: String,
      default: ConnectionStatus.unknown,
    },
    httpStatus: {
      type: String,
      default: ConnectionStatus.unknown,
    },
    status: {
      type: Object,
      default: undefined,
    },
    settings: {
      type: Object,
      default: undefined,
    },
  },
  {
    timestamps: true,
  },
)

ShellySchema.plugin(mongoosePaginate)

export interface IShelly extends Document {
  label: string
  hostname: string
  name: string
  type: ShellyType
  macAddress: string
  deviceId: string
  networks: {
    wifi: string
    address: string
  }[]
  usage: {
    isOn: boolean
    lastUpdate: Date
  }
  category: string
  room: string
  level: number
  mqttStatus: ConnectionStatus
  httpStatus: ConnectionStatus
  status: any
  settings: any
}

export const ShellyModel = mongoose.model<IShelly>('Shelly', ShellySchema)
