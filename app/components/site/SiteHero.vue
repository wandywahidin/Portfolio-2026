<script setup lang="ts">
import SpecSheet from './SpecSheet.vue'

defineProps<{ showProjectsCta: boolean }>()
const { site } = useAppConfig()
</script>

<template>
  <section class="container-site py-16 md:py-28">
    <div class="flex flex-col gap-12 md:flex-row md:items-end md:gap-20">
      <div class="flex min-w-0 flex-1 flex-col items-start gap-7">
        <p class="eyebrow">Frontend Developer · Indonesia</p>
        <h1
          class="text-[40px] leading-[1.06] font-extrabold tracking-[-0.03em] text-ink md:text-[64px]"
        >
          Antarmuka yang andal untuk produk keuangan.
        </h1>
        <p class="max-w-[600px] text-[17px] leading-[1.6] text-muted-foreground md:text-[19px]">
          Saya Wandy — 5 tahun membangun antarmuka untuk produk merchant dan pembayaran. Saya
          fokus di Vue.js dan Nuxt.js, dan senang membangun fondasi UI yang bisa dipakai ulang
          lintas produk.
        </p>
        <div class="flex flex-wrap gap-3">
          <UiButton v-if="showProjectsCta" href="#proyek">Lihat proyek</UiButton>
          <UiButton variant="secondary" :href="site.linkedin" external>LinkedIn</UiButton>
        </div>
      </div>
      <SpecSheet />
    </div>
  </section>
</template>
