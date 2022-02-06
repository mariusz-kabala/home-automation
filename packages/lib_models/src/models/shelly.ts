import mongoose, { Document, Schema } from 'mongoose'

export enum ShellyType {
  shelly1 = 'shelly1',
  shellyswitch25 = 'shellyswitch25',
  shelly1pm = 'shelly1pm',
}

export enum MqttStatus {
  unknown = 'unknown',
  connected = 'connected',
  disconnected = 'disconnected',
}

const ShellySchema = new Schema({
  label: {
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
  '@Home0IpAddress': {
    type: String,
    trim: true,
    required: false,
  },
  '@Home1IpAddress': {
    type: String,
    trim: true,
    required: false,
  },
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
    default: MqttStatus.unknown,
  },
})

export interface IShelly extends Document {
  label: string
  name: string
  type: ShellyType
  macAddress: string
  deviceId: string
  '@Home0IpAddress': string
  '@Home1IpAddress': string
  category: string
  room: string
  level: number
  mqttStatus: MqttStatus
}

export const ShellyModel = mongoose.model<IShelly>('Shelly', ShellySchema)
