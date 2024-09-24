<script setup lang='ts'>
import { destr } from 'destr'
import type { PM2Process } from '~/types/pm2'

const { t } = useI18n()

useHead({ title: t('apps.full_title') })

const { data, open } = useEventSource('/api/fetch/apps', [], { immediate: false, autoReconnect: true })
onNuxtReady(() => open())
const processes = ref<PM2Process[]>([])
watch(data, apps => processes.value = destr<PM2Process[]>(apps))
</script>

<template>
  <section class="mx-auto max-w-7xl p-4">
    <div class="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <AppCard v-for="process in processes" :key="process.pid" :process />
    </div>
    <ModalStartApp />
    <ModalRestartApp />
    <ModalReloadApp />
    <ModalStopApp />
    <ModalDeleteApp />
  </section>
</template>
