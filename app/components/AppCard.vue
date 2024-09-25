<script setup lang='ts'>
import type { PM2Process } from '~/types/pm2'

const props = defineProps({ process: { type: Object as PropType<PM2Process>, required: true } })

const { t } = useI18n()
const { user } = useUserSession()
const { openStartApp } = useStartApp()
const { openReloadApp } = useReloadApp()
const { openRestartApp } = useRestartApp()
const { openStopApp } = useStopApp()
const { openDeleteApp } = useDeleteApp()

const menu = computed(() => [[
  { label: t('apps.details'), icon: 'i-heroicons-rectangle-group-20-solid', click: () => navigateTo(`/apps/${props.process.name}`) },
  { label: t('apps.delete'), icon: 'i-heroicons-trash-20-solid', click: () => openDeleteApp(props.process.name) },
]])
</script>

<template>
  <UCard class="size-full" :ui="{background: 'bg-gray-100 dark:bg-gray-800'}">
    <div class="flex flex-col items-start justify-center space-y-1">
      <div class="flex w-full items-center justify-between">
        <p class="mb-2 flex items-center justify-center space-x-2 text-blue-500 dark:text-blue-400">
          <UIcon name="i-heroicons-cube" />
          <span class="text-lg uppercase">{{ process.name }}</span>
          <UBadge :color="process.status === 'online' ? 'green' : 'red'" variant="outline" size="xs">
            {{ process.status }}
          </UBadge>
        </p>
        <UDropdown :items="menu" :popper="{ placement: 'bottom-start' }" :ui="{ item: { disabled: 'cursor-text select-text' } }">
          <UButton icon="i-heroicons-ellipsis-vertical-20-solid" size="sm" color="gray" square variant="ghost" />
        </UDropdown>
      </div>
      <p class="mb-4 flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-cloud" />
        <span>{{ t('apps.id') }}: {{ process.pm_id.join(', ') }}</span>
      </p>
      <p class="mb-4 flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-computer-desktop" />
        <span>{{ t('apps.instances') }}: {{ process.instances }}</span>
      </p>
      <p class="mb-4 flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-cpu-chip" />
        <span>{{ t('apps.cpu') }}: {{ process.cpu }} %</span>
      </p>
      <p class="mb-4 flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-server" />
        <span>{{ t('apps.ram') }}: {{ process.ram }}</span>
      </p>
      <p class="mb-4 flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-calendar-days" />
        <span>{{ t('apps.uptime') }}: {{ process.uptime.replaceAll('minutes', t('apps.minutes')).replaceAll('hours', t('apps.hours')) }}</span>
      </p>
    </div>

    <template v-if="user?.level === 'admin'" #footer>
      <div class="flex items-center justify-center space-x-2">
        <UButton v-if="process.status === 'stopped'" icon="i-heroicons-rocket-launch" :label="t('apps.start')" color="green" size="xs" @click="openStartApp(process.name)" />
        <template v-else>
          <UButton icon="i-heroicons-bolt" :label="t('apps.reload')" color="green" size="xs" @click="openReloadApp(process.name)" />
          <UButton icon="i-heroicons-arrow-path" :label="t('apps.restart')" color="blue" size="xs" @click="openRestartApp(process.name)" />
          <UButton icon="i-heroicons-no-symbol" :label="t('apps.stop')" color="red" size="xs" @click="openStopApp(process.name)" />
        </template>
      </div>
    </template>
  </UCard>
</template>
