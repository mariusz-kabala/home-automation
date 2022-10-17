import mongoose, { Schema, Document } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

export enum ShellyType {
  shelly1 = 'shelly1',
  shellyswitch25 = 'shellyswitch25',
  shelly1pm = 'shelly1pm',
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
  category: string
  room: string
  level: number
  mqttStatus: ConnectionStatus
  httpStatus: ConnectionStatus
  status: any
}

export const ShellyModel = mongoose.model<IShelly>('Shelly', ShellySchema)
