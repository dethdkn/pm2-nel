export default defineEventHandler(async event => {
  const t = await useTranslation(event)

  await requireUserSession(event, { statusCode: 401, message: t('api.no_permission') })

  const eventStream = createEventStream(event)

  const interval = setInterval(async () => {
    const apps = await pm2List()
    eventStream.push(JSON.stringify(apps))
  }, 5000)

  eventStream.onClosed(async () => {
    clearInterval(interval)
    await eventStream.close()
  })

  return eventStream.send()
})
