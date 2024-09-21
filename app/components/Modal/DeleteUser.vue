<script setup lang='ts'>
import { IdSchema } from '~/schemas/id'

const emits = defineEmits<(e: 'update')=> void>()
const { t } = useI18n()
const toast = useToast()
const { start, finish, isLoading } = useLoadingIndicator()

const model = defineModel<boolean>()
const id = defineModel<string>('id')
const username = defineModel<string>('username')
watch(model, nv => {
  if(!nv){
    id.value = ''
    username.value = ''
  }
})

async function create(){
  start()

  const body = IdSchema.safeParse({ id: id.value })
  if(!body.success){
    for(const e of body.error.errors) toast.add({ title: e.message, icon: 'i-heroicons-exclamation-triangle-20-solid', color: 'red' })
    return finish({ error: true })
  }

  const res = await $fetch('/api/delete/user', { method: 'post', body: body.data })
    .catch(error => { toast.add({ title: error.data.message, icon: 'i-heroicons-exclamation-triangle-20-solid', color: 'red' }) })

  if(!res) return finish({ error: true })

  finish()
  toast.add({ title: res, icon: 'i-heroicons-check-badge-20-solid', color: 'green' })
  emits('update')
  model.value = false
}
</script>

<template>
  <UModal v-model="model">
    <UCard :ui="{ header: { background: 'bg-red-500 rounded-t-md' } }">
      <template #header>
        <p class="select-none text-center text-white">
          {{ t('users.delete_user') }}
        </p>
      </template>

      <p class="text-center">
        {{ t('users.delete_confirm', {username}) }}
      </p>

      <template #footer>
        <div class="flex items-center justify-center space-x-4">
          <UButton icon="i-heroicons-x-circle" :label="t('general.cancel')" color="green" :disabled="isLoading" @click="model = false" />
          <UButton icon="i-heroicons-user-minus" :label="t('users.delete')" color="red" :loading="isLoading" @click="create" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
