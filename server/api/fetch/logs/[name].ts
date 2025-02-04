import { spawn } from 'node:child_process'

export default defineEventHandler(async event => {
  const t = await useTranslation(event)

  await requireUserSession(event, { statusCode: 401, message: t('api.no_permission') })

  const params = await getValidatedRouterParams(event, AppSchema.safeParse)

  if(!params.success) throw createError({ status: 401, message: t(params.error.errors[0]?.message || 'general.unknown_error') })

  const { name } = params.data

  const eventStream = createEventStream(event)

  const pm2Logs = spawn('pm2', ['logs', '--json', name])
  pm2Logs.stdout.on('data', data => {
    const logs = (data.toString() as string).split('\n').filter(Boolean)
    for(const log of logs) eventStream.push(log)
  })

  eventStream.onClosed(async () => {
    pm2Logs.kill()
    await eventStream.close()
  })

  return eventStream.send()
})
