<script setup lang="ts">
withDefaults(defineProps<{ as?: string }>(), { as: 'div' })
</script>

<template>
  <component :is="as" class="rounded-[12px] border border-line bg-surface">
    <slot />
  </component>
</template>
