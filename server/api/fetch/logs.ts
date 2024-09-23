import { spawn } from 'node:child_process'

export default defineEventHandler(async event => {
  const t = await useTranslation(event)

  await requireUserSession(event, { statusCode: 401, message: t('api.no_permission') })

  const eventStream = createEventStream(event)

  const pm2Logs = spawn('pm2', ['logs', '--json'])
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
