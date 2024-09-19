/* eslint-disable unicorn/no-process-exit */
import { consola } from 'consola'
import dotenv from 'dotenv'
import { sha512Crypt } from 'ldap-passwords'
import mongoose, { Schema } from 'mongoose'
import process from 'node:process'

dotenv.config()

const { NUXT_MONGO_URL } = process.env

if(!NUXT_MONGO_URL){
  consola.error('MongoDB connection string is not defined in the .env file')
  process.exit(1)
}

mongoose.connect(NUXT_MONGO_URL, { dbName: 'pm2-nel' })

const User = mongoose.model('user', new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  level: { type: String, enum: ['admin', 'user'], required: true },
}))

consola.info('Starting user setup')

const action = await consola.prompt('What would you like to do?', { type: 'select', options: ['Create New User', 'Change User Password', 'List users'] })

if(action === 'Create New User'){
  const name = await consola.prompt('New username:', { placeholder: 'username' })
  if(!name){
    consola.error('Username is required')
    process.exit(1)
  }
  const alreadyExists = await User.findOne({ name: name.toLowerCase() })
  if(alreadyExists){
    consola.error('User already exists')
    process.exit(1)
  }
  consola.warn('Please type a temporary password for the new user, you can edit it later on the admin panel')
  const password = await consola.prompt('Password:', { placeholder: '********' })
  if(!password){
    consola.error('Password is required')
    process.exit(1)
  }
  const sha512Pass = sha512Crypt(password)
  const level = await consola.prompt('Choose user level', { type: 'select', options: ['admin', 'user'] })
  await new User({ name: name.toLowerCase().trim().replaceAll(' ', '-'), password: sha512Pass, level }).save()
  consola.success(`${name} created successfully!`)
  process.exit(0)
}

if(action === 'Change User Password'){
  const name = await consola.prompt('Username:', { placeholder: 'user' })
  if(!name){
    consola.error('Username is required')
    process.exit(1)
  }
  const user = await User.findOne({ name: name.toLowerCase() })
  if(!user){
    consola.error('User not found')
    process.exit(1)
  }
  consola.warn('Please type a temporary password for the user, you can edit it later on the admin panel')
  const password = await consola.prompt('New password:', { placeholder: '********' })
  if(!password){
    consola.error('Password is required')
    process.exit(1)
  }
  const sha512Pass = sha512Crypt(password)
  user.password = sha512Pass
  await user.save()
  consola.success(`${name} password modified successfully!`)
  process.exit(0)
}

if(action === 'List users'){
  const users = await User.find()
  if(users.length < 1){
    consola.warn('No users found')
    process.exit(0)
  }
  const userLevel = users.map(u => `${u.name} - ${u.level}`).join(' | ')
  consola.success(userLevel)
  process.exit(0)
}
