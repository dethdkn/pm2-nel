import { sha512Crypt } from 'ldap-passwords'
import { PasswordSchema } from '~/schemas/user'

export default defineEventHandler(async event => {
  const t = await useTranslation(event)

  const { user } = await requireUserSession(event, { statusCode: 401, message: t('api.no_permission') })

  const body = await readValidatedBody(event, PasswordSchema.safeParse)

  if(!body.success) throw createError({ status: 401, message: t(body.error.errors[0].message) })

  const { password } = body.data

  const u = await User.findOne({ name: user.username })

  if(!u) throw createError({ status: 401, message: t('api.user_not_found') })

  u.password = sha512Crypt(password)
  await u.save()

  return t('api.password_successfully_modified')
})
