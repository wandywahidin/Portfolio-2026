<script setup lang="ts">
import { Badge } from '@wandy29/ui'
</script>

<template>
  <Badge
    intent="primary"
    class="gap-1.5 rounded-full border-0 bg-accent-soft px-[10px] py-[5px] font-mono leading-normal text-accent"
  >
    <span aria-hidden="true" class="size-1.5 rounded-full bg-accent" />
    <slot />
  </Badge>
</template>
