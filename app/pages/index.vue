<script setup lang='ts'>
import type { VueUiSparkgaugeDataset } from 'vue-data-ui'
import { destr } from 'destr'
import { VueUiSparkgauge } from 'vue-data-ui'
import 'vue-data-ui/style.css'
import type { PM2Process } from '~/types/pm2'
import type { SysInfo } from '~/types/sys'

useHead({ title: 'PM2 nel' })

const { data: processesData, open: processesOpen } = useEventSource('/api/fetch/apps', [], { immediate: false, autoReconnect: true })
onNuxtReady(() => processesOpen())
const processes = ref<PM2Process[]>([])
watch(processesData, apps => processes.value = destr<PM2Process[]>(apps))

const { data: sysData, open: sysOpen } = useEventSource('/api/fetch/sys', [], { immediate: false, autoReconnect: true })
onNuxtReady(() => sysOpen())
const sys = ref<SysInfo>()
watch(sysData, s => sys.value = destr<SysInfo>(s))

const colorMode = useColorMode()
const config = computed(() => ({ style: { background: colorMode.value === 'dark' ? '#1f2937' : '#f3f4f6' } }))

const dataset = computed<VueUiSparkgaugeDataset>(() => ({ value: Number(sys.value?.usedMemory.split(' ')[0] || 0), min: 0, max: Number(sys.value?.totalMemory.split(' ')[0] || 0) }))
</script>

<template>
  <section class="mx-auto max-w-7xl p-4">
    <div class="grid w-full grid-cols-4 gap-4">
      <ClientOnly>
        <UCard class="size-full" :ui="{background: 'bg-gray-100 dark:bg-gray-800'}">
          <VueUiSparkgauge :dataset :config />
        </UCard>
      </ClientOnly>
    </div>
    {{ sys }}
  </section>
</template>
