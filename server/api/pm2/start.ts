import { AppSchema } from '~/schemas/app'

export default defineEventHandler(async event => {
  const t = await useTranslation(event)

  const { user } = await requireUserSession(event, { statusCode: 401, message: t('api.no_permission') })

  if(user.level !== 'admin') throw createError({ status: 401, message: t('api.no_permission') })

  const body = await readValidatedBody(event, AppSchema.safeParse)

  if(!body.success) throw createError({ status: 401, message: t(body.error.errors[0]?.message || 'general.unknown_error') })

  const { name } = body.data

  await pm2Start(name)

  return t('api.user_successfully_started')
})
