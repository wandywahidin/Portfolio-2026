<script setup lang="ts">
import type { Project } from '~/utils/projects'
import ProjectCard from './ProjectCard.vue'

const props = defineProps<{ projects: Project[] }>()

const home = computed(() => selectHomeProjects(props.projects))
</script>

<template>
  <section
    v-if="home.count > 0 && home.featured"
    id="proyek"
    aria-labelledby="proyek-title"
    class="scroll-mt-4 border-t border-line"
  >
    <div class="container-site flex flex-col gap-12 pt-16 pb-16 md:pt-24 md:pb-28">
      <header class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div class="flex min-w-0 flex-col gap-3">
          <p class="eyebrow">Proyek terpilih</p>
          <h2
            id="proyek-title"
            class="text-[28px] leading-tight font-bold tracking-[-0.02em] text-ink md:text-4xl"
          >
            {{ projectsHeading(home.count) }}
          </h2>
        </div>
        <p class="shrink-0 font-mono text-[13px] text-muted">{{ formatProjectCount(home.count) }}</p>
      </header>

      <div class="flex flex-col gap-6">
        <ProjectCard :project="home.featured" :index="1" featured />
        <div v-if="home.rest.length" data-test="project-grid" class="grid gap-6 md:grid-cols-2">
          <ProjectCard
            v-for="(project, i) in home.rest"
            :key="project.path"
            :project="project"
            :index="i + 2"
          />
        </div>
      </div>
    </div>
  </section>
</template>
