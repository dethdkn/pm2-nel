import { SearchUserSchema } from '~/schemas/user'

export default defineEventHandler(async event => {
  const t = await useTranslation(event)

  const { user } = await requireUserSession(event, { statusCode: 401, message: t('api.no_permission') })

  if(user.level !== 'admin') throw createError({ status: 401, message: t('api.no_permission') })

  const body = await readValidatedBody(event, SearchUserSchema.safeParse)

  if(!body.success) throw createError({ status: 401, message: body.error.errors[0]?.message ? t(body.error.errors[0]?.message) : t('general.unknown_error') })

  const { page, search, sort } = body.data

  const sortCol = sort.column === 'level' ? Users.level : Users.name

  const allUsers = await drizzle.select().from(Users).where(search ? or(ilike(Users.name, search), ilike(Users.level, search)) : isNotNull(Users.id)).orderBy(sort.direction === 'asc' ? asc(sortCol) : desc(sortCol))

  const total = allUsers.length

  const users = allUsers.slice((page - 1) * 10, page * 10)

  return { users, total }
})
