import { drizzle as d } from 'db0/integrations/drizzle/index'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const Users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  password: text('password').notNull(),
  level: text('level', { enum: ['admin', 'user'] }).notNull(),
})

export const drizzle = d(useDatabase())
