import mongoose, { Schema, Document } from 'mongoose'

const LuxSchema = new Schema({
  device: {
    type: String,
    required: true,
  },
  min: {
    type: Number,
  },
  max: {
    type: Number,
  },
})

const MovementSchema = new Schema({
  device: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
})

const UsageRuleSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    before: {
      type: String,
    },
    ater: {
      type: String,
    },
    max: {
      type: Number,
      required: true,
    },
    relay: {
      type: Number,
    },
    lux: LuxSchema,
    movement: MovementSchema,
  },
  {
    timestamps: true,
  },
)

export interface IUsageRule extends Document {
  id: string
  before?: string
  after?: string
  max: number
  relay?: number
  lux?: {
    device: string
    min?: number
    max?: number
  }
  movement?: {
    device: string
    value: number
  }
}

export const UsageRuleModel = mongoose.model<IUsageRule>('UsageRule', UsageRuleSchema)
