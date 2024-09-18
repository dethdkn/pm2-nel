export default defineEventHandler(async event => {
  const t = await useTranslation(event)

  const { user } = await requireUserSession(event, { statusCode: 401, message: t('api.no_permission') })

  if(user.level !== 'admin') throw createError({ status: 401, message: t('api.no_permission') })

  const u = await User.find({}, { password: 0 }).lean()

  return u
})
