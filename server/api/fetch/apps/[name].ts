import { AppSchema } from '~/schemas/app'

export default defineEventHandler(async event => {
  const t = await useTranslation(event)

  await requireUserSession(event, { statusCode: 401, message: t('api.no_permission') })

  const params = await getValidatedRouterParams(event, AppSchema.safeParse)

  if(!params.success) throw createError({ status: 401, message: t(params.error.errors[0]?.message || 'general.unknown_error') })

  const { name } = params.data

  const eventStream = createEventStream(event)

  const interval = setInterval(async () => {
    const appDetail = await pm2Details(name)
    eventStream.push(JSON.stringify(appDetail))
  }, 5000)

  eventStream.onClosed(async () => {
    clearInterval(interval)
    await eventStream.close()
  })

  return eventStream.send()
})
