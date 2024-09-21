export default defineNuxtRouteMiddleware(async to => {
  const { loggedIn, user, fetch } = useUserSession()
  const localePath = useLocalePath()

  await fetch()

  if(loggedIn.value && to.fullPath === localePath('/login')) return navigateTo(localePath('/'))

  if(!loggedIn.value && to.fullPath !== localePath('/login')) return navigateTo(localePath('/login'))

  if(user.value?.level !== 'admin' && to.fullPath === localePath('/users')) return navigateTo(localePath('/'))
})
