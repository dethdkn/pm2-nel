<script setup lang='ts'>
import type { PM2Process } from '~/types/pm2'

defineProps({ process: { type: Object as PropType<PM2Process>, required: true } })

const { user } = useUserSession()
</script>

<template>
  <UCard class="size-full" :ui="{background: 'bg-gray-100 dark:bg-gray-800'}">
    <div class="flex flex-col items-start justify-center space-y-1">
      <p class="mb-2 flex items-center justify-center space-x-2 text-blue-500 dark:text-blue-400">
        <UIcon name="i-heroicons-cube" />
        <span class="text-lg uppercase">{{ process.name }}</span>
        <UBadge :color="process.status === 'online' ? 'green' : 'red'" variant="outline" size="xs">
          {{ process.status }}
        </UBadge>
      </p>
      <p class="mb-4 flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-cloud" />
        <span>ID: {{ process.pm_id }}</span>
      </p>
      <p class="mb-4 flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-computer-desktop" />
        <span>Instances: {{ process.instances }}</span>
      </p>
      <p class="mb-4 flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-cpu-chip" />
        <span>CPU: {{ process.cpu }} %</span>
      </p>
      <p class="mb-4 flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-server" />
        <span>RAM: {{ process.ram }} GB</span>
      </p>
      <p class="mb-4 flex items-center justify-center space-x-2">
        <UIcon name="i-heroicons-calendar-days" />
        <span>Uptime: {{ process.uptime }} Hours</span>
      </p>
    </div>

    <template v-if="user?.level === 'admin'" #footer>
      <div class="flex items-center justify-center space-x-2">
        <UButton icon="i-heroicons-bolt" label="Reload" color="green" size="xs" />
        <UButton icon="i-heroicons-arrow-path" label="Restart" color="blue" size="xs" />
        <UButton icon="i-heroicons-no-symbol" label="Stop" color="red" size="xs" />
      </div>
    </template>
  </UCard>
</template>
