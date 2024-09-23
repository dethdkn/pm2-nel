<!-- ! incomplete -->
<script setup lang='ts'>
const { status, data, send, open, close } = useWebSocket('/api/logs', { immediate: false, autoReconnect: true })
</script>

<template>
  <section class="mx-auto max-w-7xl px-4">
    <div>logs</div>
    <p>{{ status }}</p>
    <p>{{ data }}</p>
    <UButton @click="open()">
      Open
    </UButton>
    <UButton @click="close()">
      Close
    </UButton>
    <UButton @click="send('teste123')">
      send
    </UButton>
  </section>
</template>
