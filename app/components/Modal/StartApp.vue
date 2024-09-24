<script setup lang='ts'>
const { t } = useI18n()
const { isLoading } = useLoadingIndicator()
const { modalStartApp, startAppName, startApp } = useStartApp()
</script>

<template>
  <UModal v-model="modalStartApp">
    <UCard :ui="{ header: { background: 'bg-green-500 rounded-t-md' } }">
      <template #header>
        <p class="select-none text-center text-white">
          {{ t('apps.start_app') }}
        </p>
      </template>

      <p class="text-center">
        {{ t('apps.start_app_confirmation', {name: startAppName}) }}
      </p>

      <template #footer>
        <div class="flex items-center justify-center space-x-4">
          <UButton icon="i-heroicons-x-circle" :label="t('general.cancel')" color="red" :disabled="isLoading" @click="modalStartApp = false" />
          <UButton icon="i-heroicons-rocket-launch" :label="t('apps.start')" color="green" :loading="isLoading" @click="startApp" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
