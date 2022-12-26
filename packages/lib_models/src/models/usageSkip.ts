import mongoose, { Schema, Document } from 'mongoose'

const UsageSkipSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    till: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export interface IUsageSkip extends Document {
  id: string
  till: Date
}

export const UsageSkipModel = mongoose.model<IUsageSkip>('UsageSkip', UsageSkipSchema)
