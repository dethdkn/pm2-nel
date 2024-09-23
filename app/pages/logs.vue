<script setup lang='ts'>
import { destr } from 'destr'

const { t, locale, locales } = useI18n()
const localeCode = computed(() => locales.value.find(l => l.code === locale.value)?.language || 'en-US')

useHead({ title: t('logs.title') })

interface Log{ type: 'err' | 'out' | 'pm2', process_id: number, app_name: string, message: string, timestamp: string }

const { data, open } = useEventSource('/api/logs', [], { immediate: false, autoReconnect: true })
onNuxtReady(() => open())

const logDiv = ref<HTMLElement | null>(null)
const { y, arrivedState } = useScroll(logDiv, { behavior: 'smooth' })

const logs = ref<Log[]>([])
watch(data, log => {
  if(log){
    const l = destr<Log>(log)
    logs.value.push({ ...l, timestamp: new Date(l.timestamp).toLocaleString(localeCode.value) })
    if(logs.value.length > 100) logs.value.shift()
    nextTick(() => arrivedState.bottom ? y.value = logDiv.value?.scrollHeight || 0 : undefined)
  }
})
</script>

<template>
  <section class="mx-auto max-w-7xl p-4">
    <div ref="logDiv" class="size-full h-[calc(100vh-100px)] space-y-2 overflow-y-auto rounded-md bg-gray-100 px-4 py-2 dark:bg-gray-800">
      <div v-for="log in logs" :key="log.timestamp" class="flex items-center space-x-2">
        <div>
          <UTooltip :text="log.timestamp" :popper="{ arrow: true, placement: 'top' }" class="flex justify-center">
            <UBadge :label="`${log.process_id} - ${log.app_name}`" :color="log.type === 'out' ? 'green': log.type === 'err' ? 'red': 'blue'" size="xs" />
          </UTooltip>
        </div>
        <span class="inline-block grow break-words align-top">{{ log.message }}</span>
      </div>
    </div>
  </section>
</template>

<!-- eslint-disable-next-line vue/no-restricted-block -->
<style scoped>
div::-webkit-scrollbar-button, .dark div::-webkit-scrollbar-button {
  display: none;
}

div::-webkit-scrollbar, .dark div::-webkit-scrollbar {
  width: 16px;
}

div::-webkit-scrollbar-thumb, .dark div::-webkit-scrollbar-thumb {
  border-radius: 16px;
}

div::-webkit-scrollbar {
  background-color: #f3f4f6;
}

div::-webkit-scrollbar-thumb {
  background-color: #babac0;
  border: 4px solid #f3f4f6;
}

div::-webkit-scrollbar-track {
  background-color: #f3f4f6;
}

.dark div::-webkit-scrollbar {
  background-color: #1f2937;
}

.dark div::-webkit-scrollbar-thumb {
  background-color: #718096;
  border-color: #1f2937;
}

.dark div::-webkit-scrollbar-track {
  background-color: #1f2937;
}
</style>
