<script setup lang="ts">
import type { Project } from '~/utils/projects'
import PreviewUi from './previews/PreviewUi.vue'
import PreviewGuide from './previews/PreviewGuide.vue'
import PreviewUmkm from './previews/PreviewUmkm.vue'

const props = withDefaults(
  defineProps<{ project: Project; index: number; featured?: boolean }>(),
  { featured: false },
)

const number = computed(() => String(props.index).padStart(2, '0'))
const illustrations = { ui: PreviewUi, guide: PreviewGuide, umkm: PreviewUmkm } as const
const illustration = computed(() =>
  props.project.preview === 'image' ? null : illustrations[props.project.preview],
)

const linkClass =
  'rounded-[4px] text-[15px] font-semibold text-ink hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
</script>

<template>
  <UiCard
    as="article"
    class="flex flex-col overflow-hidden"
    :class="featured ? 'gap-8 p-6 md:flex-row md:gap-12 md:p-8' : 'gap-6 p-6 md:p-7'"
  >
    <div
      class="flex min-w-0 flex-col items-start gap-4"
      :class="featured ? 'md:w-[440px] md:shrink-0 md:pt-2' : ''"
    >
      <div class="flex items-center gap-3">
        <span data-test="project-index" class="font-mono text-[13px] font-medium text-muted-foreground">
          {{ number }}
        </span>
        <UiStatus v-if="project.status" data-test="project-status">{{ project.status }}</UiStatus>
      </div>
      <h3 class="text-[22px] leading-tight font-bold tracking-[-0.01em] break-words text-ink md:text-[26px]">
        {{ project.title }}
      </h3>
      <p v-if="project.proves" data-test="project-proves" class="text-base leading-normal font-semibold text-accent">
        {{ project.proves }}
      </p>
      <p class="text-base leading-[1.6] text-muted-foreground">{{ project.summary }}</p>
      <ul v-if="project.tags.length" class="flex flex-wrap gap-2">
        <li v-for="t in project.tags" :key="t"><UiTag>{{ t }}</UiTag></li>
      </ul>
      <div class="flex flex-wrap gap-x-5 gap-y-2 pt-1">
        <ul v-if="project.links.length" data-test="project-links" class="flex flex-wrap gap-x-5 gap-y-2">
          <li v-for="l in project.links" :key="l.url">
            <a :href="l.url" target="_blank" rel="noopener noreferrer" :class="linkClass">
              {{ l.label }}<span aria-hidden="true"> ↗</span>
            </a>
          </li>
        </ul>
        <NuxtLink v-if="project.caseStudy !== false" :to="project.path" :class="linkClass">
          Studi kasus <span aria-hidden="true">→</span>
          <span class="sr-only">: {{ project.title }}</span>
        </NuxtLink>
      </div>
    </div>

    <div
      class="order-first min-w-0 overflow-hidden rounded-[8px] bg-bg"
      :class="featured ? 'md:order-none md:flex-1 md:self-stretch' : ''"
    >
      <img
        v-if="project.preview === 'image' && project.image"
        :src="project.image"
        :alt="project.title"
        loading="lazy"
        class="h-full w-full object-cover"
      >
      <component :is="illustration" v-else-if="illustration" />
    </div>
  </UiCard>
</template>
