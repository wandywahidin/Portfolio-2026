<script setup lang="ts">
const { indexable } = useRuntimeConfig().public
const isIndexable = indexable === true || String(indexable) === 'true'

if (!isIndexable) {
  useHead({ meta: [{ name: 'robots', content: 'noindex, nofollow' }] })
}
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
