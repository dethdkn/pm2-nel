<script setup lang='ts'>
import type { PM2Details } from '~/types/pm2'

defineProps({ process: { type: Object as PropType<PM2Details>, required: true } })

const { t } = useI18n()
</script>

<template>
  <UCard class="w-full" :ui="{background: 'bg-gray-100 dark:bg-gray-800'}">
    <div class="flex flex-col items-start justify-center space-y-1">
      <p class="mb-2 flex items-center justify-center space-x-2 text-blue-500 dark:text-blue-400">
        <UIcon name="i-heroicons-cube" />
        <span class="text-lg uppercase">{{ process.name }}</span>
        <UBadge :color="process.status === 'online' ? 'green' : 'red'" variant="outline" size="xs">
          {{ process.status }}
        </UBadge>
      </p>
      <p class="flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-cloud" />
        <span>{{ t('apps.id') }}: {{ process.pm_id.join(', ') }}</span>
      </p>
      <p class="flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-computer-desktop" />
        <span>{{ t('apps.instances') }}: {{ process.instances }}</span>
      </p>
      <p class="flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-tag" />
        <span>{{ t('apps.instance') }}: {{ process.app_instance }}</span>
      </p>
      <p class="flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-cpu-chip" />
        <span>{{ t('apps.cpu') }}: {{ process.cpu }} %</span>
      </p>
      <p class="flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-server" />
        <span>{{ t('apps.ram') }}: {{ process.ram }}</span>
      </p>
      <p class="flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-calendar-days" />
        <span>{{ t('apps.uptime') }}: {{ process.uptime.replaceAll('minutes', t('apps.minutes')).replaceAll('hours', t('apps.hours')) }}</span>
      </p>
      <p class="flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-command-line" />
        <span>{{ t('apps.interpreter') }}: {{ process.interpreter }}</span>
      </p>
      <p class="flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-folder" />
        <span>{{ process.cwd }}</span>
      </p>
      <p class="flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-folder-open" />
        <span>{{ process.exec_path }}</span>
      </p>
      <p class="flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-finger-print" />
        <span>{{ process.out_log }}</span>
      </p>
      <p class="flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-exclamation-triangle" />
        <span>{{ process.error_log }}</span>
      </p>
    </div>
  </UCard>
</template>
