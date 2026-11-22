<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary'
    href?: string
    external?: boolean
  }>(),
  { variant: 'primary', href: undefined, external: false },
)

const base =
  'inline-flex items-center justify-center gap-2 rounded-[8px] border px-5 py-3 text-[15px] font-semibold leading-normal transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

const variants = {
  primary: 'bg-ink text-on-accent border-ink hover:bg-accent hover:border-accent',
  secondary: 'bg-surface text-ink border-line hover:border-ink',
} as const

const classes = computed(() => [base, variants[props.variant]])
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :class="classes"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
  >
    <slot />
    <span v-if="external" aria-hidden="true">↗</span>
  </a>
  <button v-else type="button" :class="classes">
    <slot />
  </button>
</template>
