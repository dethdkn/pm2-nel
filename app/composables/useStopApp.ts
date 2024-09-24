export default createGlobalState(() => {
  const toast = useToast()
  const { start, finish } = useLoadingIndicator()

  const modalStopApp = ref(false)
  const stopAppName = ref('')

  function openStopApp(name: string){
    stopAppName.value = name
    modalStopApp.value = true
  }

  async function stopApp(){
    start()

    const res = await $fetch('/api/pm2/stop', { method: 'post', body: { name: stopAppName.value } })
      .catch(error => { toast.add({ title: error.data.message, icon: 'i-heroicons-exclamation-triangle-20-solid', color: 'red' }) })

    if(!res) return finish({ error: true })

    finish()
    toast.add({ title: res, icon: 'i-heroicons-check-badge-20-solid', color: 'green' })
    modalStopApp.value = false
  }

  watch(modalStopApp, v => {
    if(!v) stopAppName.value = ''
  })

  return { modalStopApp, stopAppName, openStopApp, stopApp }
})
