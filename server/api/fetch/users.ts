import { SearchUserSchema } from '~/schemas/user'

export default defineEventHandler(async event => {
  const t = await useTranslation(event)

  const { user } = await requireUserSession(event, { statusCode: 401, message: t('api.no_permission') })

  if(user.level !== 'admin') throw createError({ status: 401, message: t('api.no_permission') })

  const body = await readValidatedBody(event, SearchUserSchema.safeParse)

  if(!body.success) throw createError({ status: 401, message: t(body.error.errors[0]?.message || 'general.unknown_error') })

  const { page, search, sort } = body.data

  const q = search ? { $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }] } : {}

  const sortOption: Record<string, -1 | 1> = {}
  sortOption[sort.column] = sort.direction === 'asc' ? 1 : -1

  const allUsers = await User.find(q, { password: 0 }).sort(sortOption).lean()

  const total = allUsers.length

  const users = allUsers.slice((page - 1) * 10, page * 10)

  return { users, total }
})
