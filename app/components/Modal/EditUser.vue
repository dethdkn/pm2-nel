<script setup lang='ts'>
import { UpdateUserSchema } from '~/schemas/user'

const emits = defineEmits<(e: 'update')=> void>()
const { t } = useI18n()
const toast = useToast()
const { start, finish, isLoading } = useLoadingIndicator()

const model = defineModel<boolean>()
const id = defineModel<string>('id')
const username = defineModel<string>('username')
const password = ref('')
const level = defineModel<string>('level')
const state = computed(() => ({ id: id.value, name: username.value, password: password.value, level: level.value }))
const levels = computed(() => [
  { label: t('general.admin'), value: 'admin' },
  { label: t('general.user'), value: 'user' },
])

watch(model, nv => {
  if(!nv){
    id.value = ''
    username.value = ''
    password.value = ''
    level.value = 'user'
  }
})

async function edit(){
  start()

  const body = UpdateUserSchema.safeParse(state.value)
  if(!body.success){
    for(const e of body.error.errors) toast.add({ title: e.message, icon: 'i-heroicons-exclamation-triangle-20-solid', color: 'red' })
    return finish({ error: true })
  }

  const res = await $fetch('/api/update/user', { method: 'post', body: body.data })
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
    <UCard :ui="{ header: { background: 'bg-blue-500 rounded-t-md' } }">
      <template #header>
        <p class="select-none text-center text-white">
          {{ t('users.edit_user') }}
        </p>
      </template>

      <UForm :schema="UpdateUserSchema" :state class="space-y-4 md:space-y-6" @submit="edit">
        <UFormGroup :label="t('users.username')" name="name">
          <UInput v-model="username" icon="i-heroicons-user-20-solid" color="blue" />
        </UFormGroup>
        <UFormGroup :label="t('users.password')" name="password">
          <UInput v-model="password" icon="i-heroicons-key-20-solid" color="blue" type="password" />
        </UFormGroup>
        <UFormGroup :label="t('users.level')" name="level">
          <USelectMenu v-model="level" icon="i-heroicons-briefcase-20-solid" color="blue" :options="levels" option-attribute="label" value-attribute="value" />
        </UFormGroup>
      </UForm>

      <template #footer>
        <div class="flex items-center justify-center space-x-4">
          <UButton icon="i-heroicons-x-circle" :label="t('general.cancel')" color="red" :disabled="isLoading" @click="model = false" />
          <UButton icon="i-heroicons-pencil-square" :label="t('users.edit')" color="blue" :loading="isLoading" @click="edit" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
