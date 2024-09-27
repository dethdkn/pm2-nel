<script setup lang='ts'>
import type { VueUiWheelConfig, VueUiWheelDataset } from 'vue-data-ui'
import { destr } from 'destr'
import 'vue-data-ui/style.css'
// import type { PM2Process } from '~/types/pm2'
import type { SysInfo } from '~/types/sys'

useHead({ title: 'PM2 nel' })

const { t } = useI18n()
const colorMode = useColorMode()

// const { data: processesData, open: processesOpen } = useEventSource('/api/fetch/apps', [], { immediate: false, autoReconnect: true })
// onNuxtReady(() => processesOpen())
// const processes = ref<PM2Process[]>([])
// watch(processesData, apps => processes.value = destr<PM2Process[]>(apps))

const { data: sysData, open: sysOpen } = useEventSource('/api/fetch/sys', [], { immediate: false, autoReconnect: true })
onNuxtReady(() => sysOpen())
const sys = ref<SysInfo>()
watch(sysData, s => sys.value = destr<SysInfo>(s))

const ramDataset = computed<VueUiWheelDataset>(() => ({ percentage: (Number(sys.value?.usedMemory.split(' ')[0] || 0) / Number(sys.value?.totalMemory.split(' ')[0] || 0)) * 100 }))
const ramConfig = computed<VueUiWheelConfig>(() => ({ userOptions: { show: false }, style: { chart: { backgroundColor: colorMode.value === 'dark' ? '#1f2937' : '#f3f4f6' } } }))
</script>

<template>
  <section class="mx-auto max-w-7xl p-4">
    <div class="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <UCard class="size-full" :ui="{background: 'bg-gray-100 dark:bg-gray-800'}">
        <div class="flex flex-col items-center justify-center">
          <p class="mb-4 text-center text-xl">
            {{ sys?.hostname }}
          </p>
          <UIcon :name="sys?.platform === 'darwin' ? 'i-logos-apple' : sys?.platform === 'win32' ? 'i-logos-microsoft-windows-icon' : 'i-logos-linux-tux'" mode="svg" :size="sys?.platform === 'darwin' ? '6rem' : sys?.platform === 'win32' ? '5rem' : '6rem'" class="mb-4" :class="sys?.platform === 'darwin' ? 'apple' : sys?.platform === 'win32' ? 'windows' : 'linux'" />
          <p class="text-center text-xl">
            {{ sys?.platform }}
          </p>
          <p class="text-center">
            {{ t('apps.uptime') }}: {{ sys?.uptime }}
          </p>
        </div>
      </UCard>
      <UCard class="size-full" :ui="{background: 'bg-gray-100 dark:bg-gray-800'}">
        <p class="mb-4 text-center text-lg">
          {{ t('apps.cpu') }}
        </p>
        <div class="flex flex-col items-center justify-center">
          <UIcon :name="sys?.cpuName.toLowerCase().includes('amd') ? 'i-logos-amd' : 'i-logos-intel'" mode="svg" :size="sys?.cpuName.toLowerCase().includes('intel') ? '3rem': '4rem'" class="mb-4" :class="sys?.cpuName.toLowerCase().includes('amd') ? 'amd' : 'intel'" />
          <p class="text-center text-lg">
            {{ sys?.cpuName }}
          </p>
          <p class="text-center">
            {{ t('apps.cores') }}: {{ sys?.numberOfCores }}
          </p>
        </div>
      </UCard>
      <UCard class="size-full" :ui="{background: 'bg-gray-100 dark:bg-gray-800'}">
        <p class="text-center text-lg">
          {{ t('apps.ram_usage') }}
        </p>
        <p class="text-center">
          {{ sys?.usedMemory }} / {{ sys?.totalMemory }}
        </p>
        <ClientOnly>
          <VueUiWheel :dataset="ramDataset" :config="ramConfig" />
        </ClientOnly>
      </UCard>
      <UCard class="size-full" :ui="{background: 'bg-gray-100 dark:bg-gray-800'}">
        <p class="mb-4 text-center text-lg">
          {{ t('apps.node_version') }}
        </p>
        <div class="flex flex-col items-center justify-center space-y-4">
          <UIcon name="i-logos-nodejs-icon" mode="svg" size="9rem" />
          <p class="text-center text-2xl text-green-600">
            {{ sys?.nodeVersion }}
          </p>
        </div>
      </UCard>
    </div>
  </section>
</template>

<!-- eslint-disable-next-line vue/no-restricted-block, vue/enforce-style-attribute -->
<style>
.dark .amd path, .dark .intel path:nth-of-type(2), .dark .apple path {
  fill: #fff;
}
</style>
