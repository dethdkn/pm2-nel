<script setup lang='ts'>
import type { Password } from '~/schemas/user'
import { PasswordSchema } from '~/schemas/user'

const { t } = useI18n()
const toast = useToast()
const { start, finish, isLoading } = useLoadingIndicator()
const passwordModal = usePasswordModal()

const state = ref<Password>({ password: '', confirmPassword: '' })
watch(passwordModal, () => state.value = { password: '', confirmPassword: '' })

async function update(){
  start()

  const body = PasswordSchema.safeParse(state.value)
  if(!body.success){
    for(const e of body.error.errors) toast.add({ title: e.message, icon: 'i-heroicons-exclamation-triangle-20-solid', color: 'red' })
    return finish({ error: true })
  }

  const res = await $fetch('/api/update/password', { method: 'post', body: body.data })
    .catch(error => { toast.add({ title: error.data.message, icon: 'i-heroicons-exclamation-triangle-20-solid', color: 'red' }) })

  if(!res) return finish({ error: true })

  finish()
  toast.add({ title: res, icon: 'i-heroicons-check-badge-20-solid', color: 'green' })
  passwordModal.value = false
}
</script>

<template>
  <UModal v-model="passwordModal">
    <UCard :ui="{ header: { background: 'bg-green-500 rounded-t-md' } }">
      <template #header>
        <p class="select-none text-center text-white">
          {{ t('nav.update_password') }}
        </p>
      </template>

      <UForm :schema="PasswordSchema" :state class="space-y-4 md:space-y-6" @submit="update">
        <UFormGroup :label="t('users.password')" name="password">
          <UInput v-model="state.password" icon="i-heroicons-key-20-solid" type="password" />
        </UFormGroup>
        <UFormGroup :label="t('users.confirm_password')" name="confirmPassword">
          <UInput v-model="state.confirmPassword" icon="i-heroicons-key-20-solid" type="password" />
        </UFormGroup>
      </UForm>

      <template #footer>
        <div class="flex items-center justify-center space-x-4">
          <UButton icon="i-heroicons-x-circle" :label="t('general.cancel')" color="red" :disabled="isLoading" @click="passwordModal = false" />
          <UButton icon="i-heroicons-pencil-square" :label="t('users.update')" color="green" :loading="isLoading" @click="update" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
