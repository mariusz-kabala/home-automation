import mongoose, { Document, Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import findOrCreate from 'mongoose-findorcreate'

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: false,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    googleId: {
      type: String,
      trim: true,
      index: true,
      unique: true,
    },
    githubId: {
      type: String,
      trim: true,
      index: true,
      unique: true,
    },
    isBlocked: {
      type: Boolean,
      required: false,
      default: false,
    },
    roles: {
      type: Array,
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  },
)

UserSchema.plugin(uniqueValidator)
UserSchema.plugin(findOrCreate)

export interface IUser extends Document {
  isBlocked: boolean
  email: string
  roles: string[]
  name: string
  googleId: string
  githubId: string
}

export default mongoose.model<IUser>('User', UserSchema)
