<script setup lang="ts">
const { user, clear } = useUserSession()
const { t } = useI18n()
const colorMode = useColorMode()

const themeMenu = useThemeMenu()
const langMenu = useLangMenu()

const userMenu = computed(() => [
  [{ label: user.value?.username || 'username', icon: 'i-heroicons-user-circle-20-solid', disabled: true }],
  [
    { icon: 'i-heroicons-arrow-right-start-on-rectangle-20-solid', label: t('nav.logout'), click: async () => {
      await clear()
      await navigateTo('/login')
    } },
  ],
])

const routes = computed(() => [
  { path: '/', label: t('nav.home') },
  { path: '/apps', label: t('nav.apps') },
  { path: '/users', label: t('nav.users') },
  { path: '/logs', label: t('nav.logs') },
])

const menuClosed = ref(true)
</script>

<template>
  <nav class="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-slate-900">
    <div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
      <NuxtLink to="/" class="group flex items-center">
        <NuxtImg src="/nel.png" :alt="t('general.title')" class="mr-3 w-8 group-hover:animate-pulse" preload />
        <span class="self-center whitespace-nowrap text-2xl font-semibold text-slate-700 transition-all duration-300 group-hover:text-green-500 dark:text-slate-200 dark:group-hover:text-green-400">{{ t('general.title') }}</span>
      </NuxtLink>
      <div class="flex items-center space-x-4 sm:mt-0 lg:order-2">
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
        <UDropdown :items="userMenu" :popper="{ placement: 'bottom-start' }" :ui="{ item: { disabled: 'cursor-text select-text' } }">
          <UButton icon="i-heroicons-user-20-solid" size="sm" color="gray" square variant="ghost" />
        </UDropdown>
        <UButton icon="i-heroicons-bars-3-20-solid" size="sm" color="gray" square variant="ghost" class="lg:hidden" @click="menuClosed = !menuClosed" />
      </div>
      <div class="w-full items-center justify-between lg:order-1 lg:flex lg:w-auto" :class="{ hidden: menuClosed }">
        <ul class="mt-4 flex flex-col space-y-1 rounded-lg border border-gray-200 bg-white p-4 font-medium lg:mt-0 lg:flex-row lg:space-x-8 lg:space-y-0 lg:border-0 lg:p-0 dark:border-gray-800 dark:bg-slate-900">
          <li v-for="route in routes" :key="route.path">
            <NuxtLinkLocale :to="route.path" class="block rounded py-2 pl-3 pr-4 text-slate-700 transition-all duration-300 hover:bg-slate-100 lg:p-0 lg:hover:bg-transparent lg:hover:text-green-500 dark:border-gray-700 dark:text-slate-200 dark:hover:bg-slate-800 lg:dark:hover:bg-transparent lg:dark:hover:text-green-500" active-class="!text-white dark:!text-slate-900 hover:!text-white dark:hover:!text-slate-900 bg-green-500 dark:bg-green-400 hover:!bg-green-500 dark:hover:!bg-green-400 lg:!bg-transparent dark:lg:!bg-transparent lg:hover:!bg-transparent dark:lg:hover:!bg-transparent lg:!text-green-500 lg:dark:!text-green-400 lg:hover:!text-green-500 lg:dark:hover:!text-green-400" @click="menuClosed = true">
              {{ route.label }}
            </NuxtLinkLocale>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
