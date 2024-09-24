<script setup lang='ts'>
const { t } = useI18n()
const { isLoading } = useLoadingIndicator()
const { modalDeleteApp, deleteAppName, deleteApp } = useDeleteApp()
</script>

<template>
  <UModal v-model="modalDeleteApp">
    <UCard :ui="{ header: { background: 'bg-red-500 rounded-t-md' } }">
      <template #header>
        <p class="select-none text-center text-white">
          {{ t('apps.delete_app') }}
        </p>
      </template>

      <p class="text-center">
        {{ t('apps.delete_app_confirmation', {name: deleteAppName}) }}
      </p>

      <template #footer>
        <div class="flex items-center justify-center space-x-4">
          <UButton icon="i-heroicons-x-circle" :label="t('general.cancel')" color="green" :disabled="isLoading" @click="modalDeleteApp = false" />
          <UButton icon="i-heroicons-trash" :label="t('apps.delete')" color="red" :loading="isLoading" @click="deleteApp" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
