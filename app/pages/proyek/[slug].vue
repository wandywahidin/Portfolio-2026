<script setup lang="ts">
import type { Project } from '~/utils/projects'
import SiteNav from '~/components/site/SiteNav.vue'
import ContactSection from '~/components/site/ContactSection.vue'

const route = useRoute()
const path = `/proyek/${route.params.slug}`

const { data: page } = await useAsyncData(`proyek-${path}`, () =>
  queryCollection('proyek').path(path).first(),
)

// Proyek yang belum published diperlakukan seolah tidak ada.
if (!page.value || page.value.published !== true) {
  throw createError({ statusCode: 404, statusMessage: 'Halaman tidak ditemukan', fatal: true })
}

const project = computed(() => page.value as unknown as Project)

useSeoMeta({
  title: () => `${project.value.title} — Wandy Wahidin`,
  description: () => project.value.summary,
  ogTitle: () => `${project.value.title} — Wandy Wahidin`,
  ogDescription: () => project.value.summary,
  ogImage: '/og.png',
  ogType: 'article',
  twitterCard: 'summary_large_image',
})

const linkClass =
  'rounded-[4px] text-[15px] font-semibold text-ink hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
</script>

<template>
  <div class="min-h-screen bg-bg">
    <SiteNav :show-projects-link="true" />
    <main class="container-site py-12 md:py-20">
      <article class="mx-auto flex max-w-[720px] flex-col gap-6">
        <NuxtLink to="/#proyek" :class="[linkClass, 'self-start text-muted']">
          <span aria-hidden="true">←</span> Semua proyek
        </NuxtLink>
        <div class="flex items-center gap-3">
          <p class="eyebrow">Studi kasus</p>
          <UiStatus v-if="project.status">{{ project.status }}</UiStatus>
        </div>
        <h1 class="text-[34px] leading-[1.1] font-extrabold tracking-[-0.03em] break-words text-ink md:text-5xl">
          {{ project.title }}
        </h1>
        <p class="text-lg leading-normal font-semibold text-accent">{{ project.proves }}</p>
        <p class="text-[17px] leading-[1.65] text-muted">{{ project.summary }}</p>
        <ul v-if="project.tags.length" class="flex flex-wrap gap-2">
          <li v-for="t in project.tags" :key="t"><UiTag>{{ t }}</UiTag></li>
        </ul>
        <ul v-if="project.links.length" class="flex flex-wrap gap-x-5 gap-y-2">
          <li v-for="l in project.links" :key="l.url">
            <a :href="l.url" target="_blank" rel="noopener noreferrer" :class="linkClass">
              {{ l.label }}<span aria-hidden="true"> ↗</span>
            </a>
          </li>
        </ul>
        <div class="prose-case border-t border-line pt-8">
          <ContentRenderer :value="page!" />
        </div>
      </article>
    </main>
    <ContactSection />
  </div>
</template>
