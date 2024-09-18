import { sha512Crypt } from 'ldap-passwords'
import { UpdateUserSchema } from '~/schemas/user'

export default defineEventHandler(async event => {
  const t = await useTranslation(event)

  const { user } = await requireUserSession(event, { statusCode: 401, message: t('api.no_permission') })

  if(user.level !== 'admin') throw createError({ status: 401, message: t('api.no_permission') })

  const body = await readValidatedBody(event, UpdateUserSchema.safeParse)

  if(!body.success) throw createError({ status: 401, message: t(body.error.errors[0].message) })

  const { id, name, password, level } = body.data

  const u = await User.findById(id)

  if(!u) throw createError({ status: 401, message: t('api.user_not_found') })

  if(u.name !== name) u.name = name
  if(password) u.password = sha512Crypt(password)
  if(u.level !== level) u.level = level

  await u.save()

  return t('api.user_successfully_modified')
})
