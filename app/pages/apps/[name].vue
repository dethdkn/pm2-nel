<script setup lang='ts'>
import { destr } from 'destr'
import type { PM2Details } from '~/types/pm2'

const { t } = useI18n()
const { name } = useRoute().params
const processName = typeof name === 'string' ? name : ''

useHead({ title: `${processName} • ${t('general.title')}` })

const { data, open } = useEventSource(`/api/fetch/apps/${processName}`, [], { immediate: false, autoReconnect: true })
onNuxtReady(() => open())
const processes = ref<PM2Details[]>([])
watch(data, apps => processes.value = destr<PM2Details[]>(apps))
</script>

<template>
  <section class="mx-auto grid max-w-7xl grid-cols-1 gap-3 p-4 lg:min-h-[calc(100vh-100px)] lg:grid-cols-5">
    <div class="flex flex-col items-center justify-start space-y-2 lg:col-span-2">
      <DetailCard v-for="process in processes" :key="process.pid" :process />
    </div>
    <LogCard class="lg:col-span-3 lg:h-full" :name="processName" />
  </section>
</template>
