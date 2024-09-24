export default createGlobalState(() => {
  const toast = useToast()
  const { start, finish } = useLoadingIndicator()

  const modalDeleteApp = ref(false)
  const deleteAppName = ref('')

  function openDeleteApp(name: string){
    deleteAppName.value = name
    modalDeleteApp.value = true
  }

  async function deleteApp(){
    start()

    const res = await $fetch('/api/pm2/delete', { method: 'post', body: { name: deleteAppName.value } })
      .catch(error => { toast.add({ title: error.data.message, icon: 'i-heroicons-exclamation-triangle-20-solid', color: 'red' }) })

    if(!res) return finish({ error: true })

    finish()
    toast.add({ title: res, icon: 'i-heroicons-check-badge-20-solid', color: 'green' })
    modalDeleteApp.value = false
  }

  watch(modalDeleteApp, v => {
    if(!v) deleteAppName.value = ''
  })

  return { modalDeleteApp, deleteAppName, openDeleteApp, deleteApp }
})
