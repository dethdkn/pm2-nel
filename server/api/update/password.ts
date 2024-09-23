import { sha512Crypt } from 'ldap-passwords'
import { PasswordSchema } from '~/schemas/user'

export default defineEventHandler(async event => {
  const t = await useTranslation(event)

  const { user } = await requireUserSession(event, { statusCode: 401, message: t('api.no_permission') })

  const body = await readValidatedBody(event, PasswordSchema.safeParse)

  if(!body.success) throw createError({ status: 401, message: t(body.error.errors[0]?.message || 'general.unknown_error') })

  const { password } = body.data

  const [u] = await drizzle.select().from(Users).where(eq(Users.name, user.username))

  if(!u) throw createError({ status: 401, message: t('api.user_not_found') })

  await drizzle.update(Users).set({ password: sha512Crypt(password) }).where(eq(Users.name, user.username))

  return t('api.password_successfully_modified')
})
