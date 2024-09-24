<script setup lang='ts'>
const { t } = useI18n()
const { isLoading } = useLoadingIndicator()
const { modalReloadApp, reloadAppName, reloadApp } = useReloadApp()
</script>

<template>
  <UModal v-model="modalReloadApp">
    <UCard :ui="{ header: { background: 'bg-green-500 rounded-t-md' } }">
      <template #header>
        <p class="select-none text-center text-white">
          {{ t('apps.reload_app') }}
        </p>
      </template>

      <p class="text-center">
        {{ t('apps.reload_app_confirmation', {name: reloadAppName}) }}
      </p>

      <template #footer>
        <div class="flex items-center justify-center space-x-4">
          <UButton icon="i-heroicons-x-circle" :label="t('general.cancel')" color="red" :disabled="isLoading" @click="modalReloadApp = false" />
          <UButton icon="i-heroicons-bolt" :label="t('apps.reload')" color="green" :loading="isLoading" @click="reloadApp" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
