<script setup lang="ts">
import type { Project } from '~/utils/projects'
import SiteNav from '~/components/site/SiteNav.vue'
import SiteHero from '~/components/site/SiteHero.vue'
import ProjectsSection from '~/components/site/ProjectsSection.vue'
import AboutSection from '~/components/site/AboutSection.vue'
import ContactSection from '~/components/site/ContactSection.vue'

const { data: projects } = await useAsyncData('proyek-home', () =>
  queryCollection('proyek').where('published', '=', true).all(),
)

const list = computed(() => (projects.value ?? []) as unknown as Project[])
const home = computed(() => selectHomeProjects(list.value))
const hasProjects = computed(() => home.value.count > 0)

useSeoMeta({
  title: 'Wandy Wahidin — Frontend Developer',
  description: SITE_DESCRIPTION,
  ogTitle: 'Wandy Wahidin — Frontend Developer',
  ogDescription: SITE_DESCRIPTION,
  ogImage: '/og.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="min-h-screen bg-bg">
    <SiteNav :show-projects-link="hasProjects" />
    <main>
      <SiteHero :show-projects-cta="hasProjects" />
      <ProjectsSection :projects="list" />
      <AboutSection />
    </main>
    <ContactSection />
  </div>
</template>
