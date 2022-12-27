import mongoose, { Schema, Document } from 'mongoose'

export enum UsageCategory {
  lights = 'lights',
  tv = 'tv',
  sound = 'sound',
  vacuumCleaner = 'vacuumCleaner',
  other = 'other',
}

const UsageSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    relay: {
      type: Number,
    },
    room: {
      type: String,
      trim: true,
      required: true,
    },
    level: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export interface IUsage extends Document {
  type: string
  name: string
  id: string
  relay?: number
  room: string
  level: number
  category: UsageCategory
  createdAt: Date
  updatedAt: Date
}

export const UsageModel = mongoose.model<IUsage>('Usage', UsageSchema)
