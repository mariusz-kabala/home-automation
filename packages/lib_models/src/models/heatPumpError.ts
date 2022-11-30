import mongoose, { Schema, Document } from 'mongoose'

export interface IHeatPumpError extends Document {
  error: number
  message: string
}

const HeatPumpErrorSchema = new Schema(
  {
    error: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const HeatPumpErrorModel = mongoose.model<IHeatPumpError>('HeatPumpError', HeatPumpErrorSchema)
