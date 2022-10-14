import mongoose, { Schema, Document } from 'mongoose'

const ZigbeeDeviceSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },
    availability: {
      type: Boolean,
      required: false,
      default: true,
    },
    data: {
      type: Object,
      default: undefined,
    },
  },
  {
    timestamps: true,
  },
)

export interface IZigbeeDevice<T = undefined> extends Document {
  name: string
  availability: boolean
  data: T
}

export const ZigbeeDeviceModel = mongoose.model<IZigbeeDevice>('ZigbeeDevice', ZigbeeDeviceSchema)
