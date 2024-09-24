export default createGlobalState(() => {
  const toast = useToast()
  const { start, finish } = useLoadingIndicator()

  const modalStartApp = ref(false)
  const startAppName = ref('')

  function openStartApp(name: string){
    startAppName.value = name
    modalStartApp.value = true
  }

  async function startApp(){
    start()

    const res = await $fetch('/api/pm2/start', { method: 'post', body: { name: startAppName.value } })
      .catch(error => { toast.add({ title: error.data.message, icon: 'i-heroicons-exclamation-triangle-20-solid', color: 'red' }) })

    if(!res) return finish({ error: true })

    finish()
    toast.add({ title: res, icon: 'i-heroicons-check-badge-20-solid', color: 'green' })
    modalStartApp.value = false
  }

  watch(modalStartApp, v => {
    if(!v) startAppName.value = ''
  })

  return { modalStartApp, startAppName, openStartApp, startApp }
})
