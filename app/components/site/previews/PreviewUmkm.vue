<script setup lang="ts">
// Ilustrasi struktur layar HPP. Angkanya hanya contoh tampilan,
// sengaja berbeda dari mockup Figma (spec melarang memakai data contoh desain).
const rows = [
  { name: 'Bahan utama', cost: 6000 },
  { name: 'Bahan pendamping', cost: 2000 },
  { name: 'Bumbu', cost: 1500 },
  { name: 'Kemasan', cost: 1000 },
]
const total = rows.reduce((s, r) => s + r.cost, 0)
const max = Math.max(...rows.map(r => r.cost))
const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`
</script>

<template>
  <div aria-hidden="true" class="flex h-[300px] flex-col justify-center gap-3.5 p-5 md:h-[320px] md:p-7">
    <div class="flex flex-col gap-1.5 rounded-[8px] border border-line bg-surface p-4">
      <span class="font-mono text-[11px] text-muted">HPP per porsi · ilustrasi</span>
      <span class="text-[28px] leading-none font-extrabold tracking-[-0.02em] text-ink">{{ rp(total) }}</span>
    </div>
    <div v-for="r in rows" :key="r.name" class="flex flex-col gap-1.5">
      <div class="flex justify-between gap-3">
        <span class="text-[13px] font-medium text-ink">{{ r.name }}</span>
        <span class="font-mono text-xs text-muted">{{ rp(r.cost) }}</span>
      </div>
      <div class="h-1.5 w-full max-w-[300px] overflow-hidden rounded-[3px] bg-line">
        <div class="h-full rounded-[3px] bg-accent" :style="{ width: `${(r.cost / max) * 57}%` }" />
      </div>
    </div>
  </div>
</template>
