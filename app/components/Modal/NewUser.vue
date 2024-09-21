<script setup lang='ts'>
import type { Users } from '~/schemas/user'
import { UserSchema } from '~/schemas/user'

const emits = defineEmits<(e: 'update')=> void>()
const { t } = useI18n()
const toast = useToast()
const { start, finish, isLoading } = useLoadingIndicator()

const model = defineModel<boolean>()
const levels = computed(() => [
  { label: t('general.admin'), value: 'admin' },
  { label: t('general.user'), value: 'user' },
])

const state = ref<Users>({ name: '', password: '', level: 'user' })
watch(model, () => state.value = { name: '', password: '', level: 'user' })

async function create(){
  start()

  const body = UserSchema.safeParse(state.value)
  if(!body.success){
    for(const e of body.error.errors) toast.add({ title: e.message, icon: 'i-heroicons-exclamation-triangle-20-solid', color: 'red' })
    return finish({ error: true })
  }

  const res = await $fetch('/api/insert/user', { method: 'post', body: body.data })
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
    <UCard :ui="{ header: { background: 'bg-green-500 rounded-t-md' } }">
      <template #header>
        <p class="select-none text-center text-white">
          {{ t('users.new_user') }}
        </p>
      </template>

      <UForm :schema="UserSchema" :state class="space-y-4 md:space-y-6" @submit="create">
        <UFormGroup :label="t('users.username')" name="name">
          <UInput v-model="state.name" icon="i-heroicons-user-20-solid" />
        </UFormGroup>
        <UFormGroup :label="t('users.password')" name="password">
          <UInput v-model="state.password" icon="i-heroicons-key-20-solid" type="password" />
        </UFormGroup>
        <UFormGroup :label="t('users.level')" name="level">
          <USelectMenu v-model="state.level" icon="i-heroicons-briefcase-20-solid" :options="levels" option-attribute="label" value-attribute="value" />
        </UFormGroup>
      </UForm>

      <template #footer>
        <div class="flex items-center justify-center space-x-4">
          <UButton icon="i-heroicons-x-circle" :label="t('general.cancel')" color="red" :disabled="isLoading" @click="model = false" />
          <UButton icon="i-heroicons-user-plus" :label="t('users.create')" color="green" :loading="isLoading" @click="create" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
