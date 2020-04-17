import mongoose, { Document, Schema } from 'mongoose'

import { IUser } from './user'

const RefreshTokenSchema = new Schema({
  token: {
    type: String,
    trim: false,
    required: true,
    index: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
})

export interface IRefreshToken extends Document {
  token: string
  user: IUser['_id']
}

export default mongoose.model<IRefreshToken>('RefreshToken', RefreshTokenSchema)
