import { sha512Crypt } from 'ldap-passwords'
import { UserSchema } from '~/schemas/user'

export default defineEventHandler(async event => {
  const t = await useTranslation(event)

  const { user } = await requireUserSession(event, { statusCode: 401, message: t('api.no_permission') })

  if(user.level !== 'admin') throw createError({ status: 401, message: t('api.no_permission') })

  const body = await readValidatedBody(event, UserSchema.safeParse)

  if(!body.success) throw createError({ status: 401, message: t(body.error.errors[0]?.message || 'general.unknown_error') })

  const { name, password, level } = body.data

  const alreadyExist = await User.findOne({ name })

  if(alreadyExist) throw createError({ status: 401, message: t('api.user_already_registered') })

  await new User({ name, password: sha512Crypt(password), level }).save()

  return t('api.user_registered_successfully')
})
