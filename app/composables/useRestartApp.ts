export default createGlobalState(() => {
  const toast = useToast()
  const { start, finish } = useLoadingIndicator()

  const modalRestartApp = ref(false)
  const restartAppName = ref('')

  function openRestartApp(name: string){
    restartAppName.value = name
    modalRestartApp.value = true
  }

  async function restartApp(){
    start()

    const res = await $fetch('/api/pm2/restart', { method: 'post', body: { name: restartAppName.value } })
      .catch(error => { toast.add({ title: error.data.message, icon: 'i-heroicons-exclamation-triangle-20-solid', color: 'red' }) })

    if(!res) return finish({ error: true })

    finish()
    toast.add({ title: res, icon: 'i-heroicons-check-badge-20-solid', color: 'green' })
    modalRestartApp.value = false
  }

  watch(modalRestartApp, v => {
    if(!v) restartAppName.value = ''
  })

  return { modalRestartApp, restartAppName, openRestartApp, restartApp }
})
