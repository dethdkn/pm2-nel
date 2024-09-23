import { verifySha512Crypt } from 'ldap-passwords'
import { AuthSchema } from '~/schemas/auth'

export default defineEventHandler(async event => {
  const t = await useTranslation(event)

  const body = await readValidatedBody(event, AuthSchema.safeParse)

  if(!body.success) throw createError({ status: 401, message: t(body.error.errors[0]?.message || 'general.unknown_error') })

  const { username, password } = body.data

  const [user] = await drizzle.select().from(Users).where(eq(Users.name, username))

  if(!user) throw createError({ status: 401, message: t('api.user_password_incorrect') })

  if(!verifySha512Crypt(password, user.password)) throw createError({ status: 401, message: t('api.user_password_incorrect') })

  await setUserSession(event, { user: { username: user.name, level: user.level } })

  return t('api.authenticated_successfully')
})
