<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)

useSeoMeta({
  robots: 'noindex, nofollow',
  title: () => (notFound.value ? 'Halaman tidak ditemukan — Wandy Wahidin' : 'Terjadi kesalahan — Wandy Wahidin'),
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-bg">
    <main class="container-site flex flex-1 flex-col items-start justify-center gap-6 py-20">
      <p class="eyebrow">{{ error.statusCode }}</p>
      <h1 class="text-[40px] leading-[1.06] font-extrabold tracking-[-0.03em] text-ink md:text-[56px]">
        {{ notFound ? 'Halaman tidak ditemukan' : 'Terjadi kesalahan' }}
      </h1>
      <p class="max-w-[520px] text-[17px] leading-[1.6] text-muted">
        {{ notFound ? 'Alamat ini tidak ada atau belum dipublikasikan.' : 'Silakan coba lagi sebentar lagi.' }}
      </p>
      <UiButton href="/">Kembali ke beranda</UiButton>
    </main>
  </div>
</template>
