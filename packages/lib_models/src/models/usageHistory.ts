import mongoose, { Schema, Document } from 'mongoose'
import { UsageCategory } from './usage'

const UsageHistorySchema = new Schema({
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
  category: {
    type: String,
    trim: true,
    required: false,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
})

export interface IUsageHistory extends Document {
  type: string
  name: string
  id: string
  room?: string
  level: number
  category?: UsageCategory
  start: Date
  end: Date
}

export const UsageHistoryModel = mongoose.model<IUsageHistory>('UsageHistory', UsageHistorySchema)
