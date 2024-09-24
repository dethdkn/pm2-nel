export default createGlobalState(() => {
  const toast = useToast()
  const { start, finish } = useLoadingIndicator()

  const modalReloadApp = ref(false)
  const reloadAppName = ref('')

  function openReloadApp(name: string){
    reloadAppName.value = name
    modalReloadApp.value = true
  }

  async function reloadApp(){
    start()

    const res = await $fetch('/api/pm2/reload', { method: 'post', body: { name: reloadAppName.value } })
      .catch(error => { toast.add({ title: error.data.message, icon: 'i-heroicons-exclamation-triangle-20-solid', color: 'red' }) })

    if(!res) return finish({ error: true })

    finish()
    toast.add({ title: res, icon: 'i-heroicons-check-badge-20-solid', color: 'green' })
    modalReloadApp.value = false
  }

  watch(modalReloadApp, v => {
    if(!v) reloadAppName.value = ''
  })

  return { modalReloadApp, reloadAppName, openReloadApp, reloadApp }
})
