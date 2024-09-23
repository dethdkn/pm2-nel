export default defineEventHandler(async event => {
  const t = await useTranslation(event)

  await requireUserSession(event, { statusCode: 401, message: t('api.no_permission') })

  const eventStream = createEventStream(event)

  const interval = setInterval(() => {
    const sys = sysInfo()
    eventStream.push(JSON.stringify(sys))
  }, 5000)

  eventStream.onClosed(async () => {
    clearInterval(interval)
    await eventStream.close()
  })

  return eventStream.send()
})
