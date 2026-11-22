<script setup lang="ts">
defineProps<{ showProjectsLink: boolean }>()
const { site } = useAppConfig()

const linkClass =
  'rounded-[4px] text-[15px] font-medium text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
</script>

<template>
  <header class="border-b border-line">
    <nav aria-label="Utama" class="container-site flex items-center justify-between gap-4 py-5">
      <NuxtLink
        to="/"
        class="flex min-w-0 items-center gap-2.5 rounded-[6px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span
          aria-hidden="true"
          class="flex size-7 shrink-0 items-center justify-center rounded-[6px] bg-ink font-mono text-[15px] font-medium text-on-accent"
        >w</span>
        <span class="hidden font-mono text-[15px] font-medium text-ink sm:inline">Wandy Wahidin</span>
        <span class="sr-only sm:hidden">Wandy Wahidin</span>
      </NuxtLink>

      <div class="flex items-center gap-5 md:gap-8">
        <a v-if="showProjectsLink" href="/#proyek" :class="linkClass">Proyek</a>
        <a href="/#tentang" :class="[linkClass, 'hidden md:inline']">Tentang</a>
        <a href="/#kontak" :class="[linkClass, 'hidden md:inline']">Kontak</a>
        <UiButton v-if="site.cvPath" variant="secondary" :href="site.cvPath" class="shrink-0">
          Unduh CV
        </UiButton>
      </div>
    </nav>
  </header>
</template>
