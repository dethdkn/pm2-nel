export default defineEventHandler(async event => {
  const t = await useTranslation(event)

  await requireUserSession(event, { statusCode: 401, message: t('api.no_permission') })

  const eventStream = createEventStream(event)

  eventStream.push(JSON.stringify(await pm2List()))

  const interval = setInterval(async () => eventStream.push(JSON.stringify(await pm2List())), 1000)

  eventStream.onClosed(async () => {
    clearInterval(interval)
    await eventStream.close()
  })

  return eventStream.send()
})
