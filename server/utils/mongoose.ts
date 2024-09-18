import mongoose, { Schema } from 'mongoose'
import type { Users } from '~/schemas/user'

const { mongoUrl } = useRuntimeConfig()

mongoose.connect(mongoUrl, { dbName: 'pm2-horus' })

export const User = mongoose.model('user', new Schema<Users>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  level: { type: String, enum: ['admin', 'user'], required: true },
}))
