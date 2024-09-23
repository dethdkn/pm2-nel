<script setup lang='ts'>
const { name } = useRoute().params
</script>

<template>
  <section class="mx-auto max-w-7xl px-4">
    <div>{{ name }}</div>
  </section>
</template>
