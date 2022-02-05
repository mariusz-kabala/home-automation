import mongoose, { Document, Schema } from 'mongoose'

const ShellySchema = new Schema({
  label: {
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
})

export interface IShelly extends Document {
  label: string
  name: string
  macAddress: string
  deviceId: string
  '@Home0IpAddress': string
  '@Home1IpAddress': string
  category: string
  room: string
  level: number
}

export default mongoose.model<IShelly>('Shelly', ShellySchema)
