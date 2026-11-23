<script setup lang="ts">
const stack = ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'React.js', 'Pinia']
const certs = [
  { title: 'DevSecOps Technical Excellence', issuer: 'NaradaCode · 2023' },
  { title: 'Secure Coding Training', issuer: 'ITSEC Asia · 2025' },
]
</script>

<template>
  <section id="tentang" aria-labelledby="tentang-title" class="scroll-mt-4 border-t border-line">
    <div class="container-site flex flex-col gap-12 py-16 md:flex-row md:gap-20 md:py-24">
      <div class="flex min-w-0 flex-1 flex-col gap-5">
        <h2 id="tentang-title" class="eyebrow">Tentang</h2>
        <p class="text-xl leading-[1.45] font-semibold tracking-[-0.01em] text-ink md:text-2xl">
          Saya terbiasa bekerja di lingkungan yang menuntut ketelitian: sistem yang dipakai banyak
          merchant, standar keamanan yang ketat, dan kolaborasi erat dengan tim backend.
        </p>
        <p class="text-[17px] leading-[1.65] text-muted-foreground">
          Di luar pekerjaan produk, saya suka membuat alat yang menghemat kerja tim — dari otomasi
          kecil sampai pustaka komponen.
        </p>
      </div>

      <div class="flex w-full flex-col gap-7 md:w-[420px] md:shrink-0">
        <div class="flex flex-col gap-3">
          <h3 class="eyebrow">Stack</h3>
          <ul data-test="stack" class="flex flex-wrap gap-2">
            <li v-for="t in stack" :key="t"><UiTag>{{ t }}</UiTag></li>
          </ul>
        </div>
        <div class="flex flex-col gap-3">
          <h3 class="eyebrow">Sertifikasi</h3>
          <ul>
            <li
              v-for="c in certs"
              :key="c.title"
              data-test="cert"
              class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-line py-3"
            >
              <span class="text-[15px] font-semibold text-ink">{{ c.title }}</span>
              <span class="font-mono text-xs text-muted-foreground">{{ c.issuer }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
