<script setup lang='ts'>
const { t } = useI18n()
const { isLoading } = useLoadingIndicator()
const { modalRestartApp, restartAppName, restartApp } = useRestartApp()
</script>

<template>
  <UModal v-model="modalRestartApp">
    <UCard :ui="{ header: { background: 'bg-blue-500 rounded-t-md' } }">
      <template #header>
        <p class="select-none text-center text-white">
          {{ t('apps.restart_app') }}
        </p>
      </template>

      <p class="text-center">
        {{ t('apps.restart_app_confirmation', {name: restartAppName}) }}
      </p>

      <template #footer>
        <div class="flex items-center justify-center space-x-4">
          <UButton icon="i-heroicons-x-circle" :label="t('general.cancel')" color="red" :disabled="isLoading" @click="modalRestartApp = false" />
          <UButton icon="i-heroicons-arrow-path" :label="t('apps.restart')" color="blue" :loading="isLoading" @click="restartApp" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
