<script setup lang="ts">
const { site } = useAppConfig()

const socials = computed(() =>
  [
    { label: 'LinkedIn', url: site.linkedin },
    { label: 'GitHub', url: site.github },
    { label: 'npm', url: site.npm },
  ].filter(s => s.url),
)
</script>

<template>
  <section id="kontak" aria-labelledby="kontak-title" class="scroll-mt-4 bg-ink text-on-accent">
    <div class="container-site flex flex-col gap-16 pt-16 pb-12 md:pt-24">
      <div class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div class="flex min-w-0 flex-1 flex-col gap-4">
          <p class="font-mono text-xs font-medium tracking-[0.08em] uppercase opacity-70">Kontak</p>
          <h2
            id="kontak-title"
            class="text-[34px] leading-[1.1] font-extrabold tracking-[-0.03em] md:text-5xl"
          >
            Sedang membangun produk keuangan?<br>Mari bicara.
          </h2>
        </div>
        <a
          :href="`mailto:${site.email}`"
          class="max-w-full self-start rounded-[8px] bg-surface px-5 py-3.5 font-mono text-[15px] font-medium break-all text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-accent md:self-auto"
        >{{ site.email }}</a>
      </div>

      <footer
        class="flex flex-col gap-4 border-t border-muted-foreground pt-6 md:flex-row md:items-start md:justify-between"
      >
        <p class="font-mono text-xs opacity-70">
          © 2026 Wandy Wahidin · Dibangun dengan Nuxt &amp; Tailwind CSS
        </p>
        <ul class="flex gap-6 text-sm font-medium">
          <li v-for="s in socials" :key="s.label">
            <a
              :href="s.url"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-[4px] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-accent"
            >{{ s.label }}<span aria-hidden="true"> ↗</span></a>
          </li>
        </ul>
      </footer>
    </div>
  </section>
</template>
