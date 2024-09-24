<script setup lang='ts'>
const { t } = useI18n()
const { isLoading } = useLoadingIndicator()
const { modalStopApp, stopAppName, stopApp } = useStopApp()
</script>

<template>
  <UModal v-model="modalStopApp">
    <UCard :ui="{ header: { background: 'bg-red-500 rounded-t-md' } }">
      <template #header>
        <p class="select-none text-center text-white">
          {{ t('apps.stop_app') }}
        </p>
      </template>

      <p class="text-center">
        {{ t('apps.stop_app_confirmation', {name: stopAppName}) }}
      </p>

      <template #footer>
        <div class="flex items-center justify-center space-x-4">
          <UButton icon="i-heroicons-x-circle" :label="t('general.cancel')" color="green" :disabled="isLoading" @click="modalStopApp = false" />
          <UButton icon="i-heroicons-no-symbol" :label="t('apps.stop')" color="red" :loading="isLoading" @click="stopApp" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
