<script setup lang='ts'>
const { t } = useI18n()

useHead({ title: t('logs.full_title') })
</script>

<template>
  <section class="mx-auto max-w-7xl p-4">
    <LogCard />
  </section>
</template>
