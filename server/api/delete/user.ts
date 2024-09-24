import { IdSchema } from '~/schemas/id'

export default defineEventHandler(async event => {
  const t = await useTranslation(event)

  const { user } = await requireUserSession(event, { statusCode: 401, message: t('api.no_permission') })

  if(user.level !== 'admin') throw createError({ status: 401, message: t('api.no_permission') })

  const body = await readValidatedBody(event, IdSchema.safeParse)

  if(!body.success) throw createError({ status: 401, message: body.error.errors[0]?.message ? t(body.error.errors[0]?.message) : t('general.unknown_error') })

  const { id } = body.data

  const [u] = await drizzle.select().from(Users).where(eq(Users.id, id))

  if(!u) throw createError({ status: 401, message: t('api.user_not_found') })

  await drizzle.delete(Users).where(eq(Users.id, id))

  return t('api.user_deleted_successfully')
})
