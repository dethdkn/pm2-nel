import { sha512Crypt } from 'ldap-passwords'

export default defineTask({
  async run(){
    const db = useDatabase()
    await db.sql`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      password TEXT NOT NULL,
      level TEXT CHECK(level IN ('admin', 'user')) NOT NULL
    )`

    const isEmpty = (await drizzle.select().from(Users).all()).length === 0
    if(isEmpty) await drizzle.insert(Users).values({ name: 'nel', password: sha512Crypt('@PM2-nel'), level: 'admin' })

    return { result: 'ok' }
  },
})
