import { AppSchema } from '~/schemas/app'

export default defineEventHandler(async event => {
  const t = await useTranslation(event)

  await requireUserSession(event, { statusCode: 401, message: t('api.no_permission') })

  const params = await getValidatedRouterParams(event, AppSchema.safeParse)

  if(!params.success) throw createError({ status: 401, message: t(params.error.errors[0]?.message || 'general.unknown_error') })

  const { name } = params.data

  const details = await pm2Details(name)

  if(details.length === 0) throw createError({ status: 404, message: t('api.app_not_found') })

  const eventStream = createEventStream(event)

  eventStream.push(JSON.stringify(await pm2Details(name)))

  const interval = setInterval(async () => eventStream.push(JSON.stringify(await pm2Details(name))), 1000)

  eventStream.onClosed(async () => {
    clearInterval(interval)
    await eventStream.close()
  })

  return eventStream.send()
})
