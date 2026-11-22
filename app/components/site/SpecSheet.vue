<script setup lang="ts">
const rows = [
  { label: 'Stack', value: 'Vue.js · Nuxt.js · Tailwind CSS' },
  { label: 'Domain', value: 'Merchant & pembayaran' },
  { label: 'Keamanan', value: 'DevSecOps · Secure Coding' },
  { label: 'Sedang dibangun', value: '@wandy/ui v0.1' },
]
</script>

<template>
  <UiCard
    as="section"
    aria-label="Ringkasan profil"
    class="w-full overflow-hidden md:w-[380px] md:shrink-0"
  >
    <div class="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
      <span class="font-mono text-xs font-medium tracking-[0.08em] text-muted">profile.json</span>
      <UiStatus>Aktif membangun</UiStatus>
    </div>
    <dl>
      <div
        v-for="(row, i) in rows"
        :key="row.label"
        data-test="spec-row"
        class="flex items-start gap-4 px-5 py-3.5"
        :class="{ 'border-b border-line': i < rows.length - 1 }"
      >
        <dt class="w-[110px] shrink-0 font-mono text-[13px] text-muted">{{ row.label }}</dt>
        <dd class="min-w-0 flex-1 text-sm font-semibold text-ink">{{ row.value }}</dd>
      </div>
    </dl>
  </UiCard>
</template>
