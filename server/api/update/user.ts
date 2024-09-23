import { eq } from 'drizzle-orm'
import { sha512Crypt } from 'ldap-passwords'
import { UpdateUserSchema } from '~/schemas/user'

export default defineEventHandler(async event => {
  const t = await useTranslation(event)

  const { user } = await requireUserSession(event, { statusCode: 401, message: t('api.no_permission') })

  if(user.level !== 'admin') throw createError({ status: 401, message: t('api.no_permission') })

  const body = await readValidatedBody(event, UpdateUserSchema.safeParse)

  if(!body.success) throw createError({ status: 401, message: t(body.error.errors[0]?.message || 'general.unknown_error') })

  const { id, name, password, level } = body.data

  if(user.username === name) throw createError({ status: 401, message: t('api.no_permission') })

  const [u] = await drizzle.select().from(Users).where(eq(Users.id, id))

  if(!u) throw createError({ status: 401, message: t('api.user_not_found') })

  if(u.name !== name) u.name = name
  if(password) u.password = sha512Crypt(password)
  if(u.level !== level) u.level = level

  await drizzle.update(Users).set({
    name: name || u.name,
    password: password ? sha512Crypt(password) : u.password,
    level: level || u.level,
  }).where(eq(Users.id, id))

  return t('api.user_successfully_modified')
})
