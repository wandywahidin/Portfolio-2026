<script setup lang="ts">
import { Badge } from '@wandy29/ui'
</script>

<template>
  <Badge
    variant="outline"
    class="rounded-[6px] border-line bg-bg px-[10px] py-[5px] font-mono leading-normal text-muted-foreground"
  >
    <slot />
  </Badge>
</template>
