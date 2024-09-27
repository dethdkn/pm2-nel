<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({ error: { type: Object as PropType<NuxtError>, required: true } })
</script>

<!-- eslint-disable vue/no-bare-strings-in-template -->
<template>
  <main class="min-h-screen bg-white dark:bg-slate-900">
    <section class="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center space-y-5 px-6">
      <img src="/nel.png" alt="PM2 Nel" class="w-32">
      <div class="w-full rounded-lg bg-slate-50 shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-slate-800">
        <div class="space-y-6 p-2">
          <div class="flex w-full flex-col items-center justify-between">
            <h1 mclass="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              PM2 Nel
            </h1>
            <p class="text-xl text-red-500">
              {{ error.statusCode }}
            </p>
            <p>{{ error.message }}</p>
            <UButton icon="i-heroicons-home" class="mt-4" :ui="{ rounded: 'rounded-full' }" @click="clearError({redirect: '/'})" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
