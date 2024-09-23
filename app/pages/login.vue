<script setup lang="ts">
import type { Auth } from '~/schemas/auth'
import { AuthSchema } from '~/schemas/auth'

const { t } = useI18n()
const toast = useToast()
const { start, finish, isLoading } = useLoadingIndicator()
const colorMode = useColorMode()
const themeMenu = useThemeMenu()
const langMenu = useLangMenu()

useHead({ title: t('login.full_title') })
definePageMeta({ layout: false })

const state = ref<Auth>({ username: '', password: '' })
async function login(){
  start()

  const body = AuthSchema.safeParse(state.value)
  if(!body.success){
    for(const e of body.error.errors) toast.add({ title: e.message, icon: 'i-heroicons-exclamation-triangle-20-solid', color: 'red' })
    return finish({ error: true })
  }

  const res = await $fetch('/api/auth', { method: 'post', body: body.data })
    .catch(error => { toast.add({ title: error.data.message, icon: 'i-heroicons-exclamation-triangle-20-solid', color: 'red' }) })

  if(!res) return finish({ error: true })

  finish({ force: true })
  toast.add({ title: res, icon: 'i-heroicons-check-badge-20-solid', color: 'green' })
  await navigateTo('/')
}
</script>

<template>
  <main class="min-h-screen bg-white dark:bg-slate-900">
    <section class="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center space-y-5 px-6">
      <NuxtImg src="/nel.png" :alt="t('general.title')" class="w-32" preload />
      <div class="w-full rounded-lg bg-slate-50 shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-slate-800">
        <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
          <div class="flex w-full items-center justify-between">
            <h1 mclass="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {{ t('general.title') }}
            </h1>
            <div class="flex items-center justify-center space-x-2">
              <UDropdown :items="langMenu" :popper="{ placement: 'bottom-start' }">
                <UButton icon="i-heroicons-language-20-solid" size="sm" color="gray" square variant="ghost" />
              </UDropdown>
              <ClientOnly>
                <UDropdown :items="themeMenu" :popper="{ placement: 'bottom-start' }">
                  <UButton :icon="colorMode.preference === 'system' ? 'i-heroicons-computer-desktop-20-solid' : colorMode.preference === 'light' ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid'" size="sm" color="gray" square variant="ghost" />
                </UDropdown>
                <template #fallback>
                  <div class="size-6 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
                </template>
              </ClientOnly>
            </div>
          </div>
          <UForm :schema="AuthSchema" :state class="space-y-4 md:space-y-6" @submit="login">
            <UFormGroup :label="t('login.username')" name="username">
              <UInput v-model="state.username" icon="i-heroicons-user-20-solid" size="lg" />
            </UFormGroup>
            <UFormGroup :label="t('login.password')" name="password">
              <UInput v-model="state.password" icon="i-heroicons-key-20-solid" size="lg" type="password" />
            </UFormGroup>
            <UButton icon="i-heroicons-arrow-right-end-on-rectangle-20-solid" :label="t('login.title')" color="green" variant="solid" block type="submit" :loading="isLoading" />
          </UForm>
        </div>
      </div>
    </section>
  </main>
</template>
