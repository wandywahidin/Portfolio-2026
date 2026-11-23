import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ProjectsSection from '~/components/site/ProjectsSection.vue'
import ProjectCard from '~/components/site/ProjectCard.vue'
import type { Project } from '~/utils/projects'

function p(over: Partial<Project> = {}): Project {
  return {
    path: '/proyek/x',
    title: 'Proyek X',
    order: 1,
    featured: false,
    proves: 'Membuktikan: sesuatu.',
    summary: 'Ringkasan.',
    tags: ['Vue 3'],
    status: 'v0.1',
    links: [{ label: 'Demo', url: 'https://example.com' }],
    preview: 'ui',
    published: true,
    ...over,
  }
}

describe('ProjectsSection', () => {
  it('renders nothing when no project is published', async () => {
    const w = await mountSuspended(ProjectsSection, {
      props: {
        projects: [
          p({ published: false }),
          p({ published: false, order: 2 }),
          p({ published: false, order: 3 }),
        ],
      },
    })
    expect(w.find('#proyek').exists()).toBe(false)
    expect(w.text()).toBe('')
    expect(w.html()).not.toContain('00 proyek')
  })

  it('one published project → single featured card, no grid, "01 proyek"', async () => {
    const w = await mountSuspended(ProjectsSection, {
      props: { projects: [p({ title: 'Satu' }), p({ published: false, order: 2 })] },
    })
    expect(w.find('#proyek').exists()).toBe(true)
    const cards = w.findAllComponents(ProjectCard)
    expect(cards).toHaveLength(1)
    expect(cards[0]!.props('featured')).toBe(true)
    expect(w.find('[data-test=project-grid]').exists()).toBe(false)
    expect(w.text()).toContain('01 proyek')
    expect(w.find('h2').text()).toBe('Proyek pilihan.')
    expect(w.text()).not.toContain('Tiga')
  })

  it('three published → one featured card and a grid with two cards', async () => {
    const w = await mountSuspended(ProjectsSection, {
      props: { projects: [p({ order: 3 }), p({ order: 1 }), p({ order: 2 })] },
    })
    const cards = w.findAllComponents(ProjectCard)
    expect(cards.filter(c => c.props('featured'))).toHaveLength(1)
    expect(w.find('[data-test=project-grid]').findAllComponents(ProjectCard)).toHaveLength(2)
    expect(w.text()).toContain('03 proyek')
    expect(w.find('h2').text()).toBe('Tiga proyek, masing-masing membuktikan satu hal.')
  })
})

describe('ProjectCard', () => {
  it('hides the links row when links is empty', async () => {
    const w = await mountSuspended(ProjectCard, { props: { project: p({ links: [] }), index: 1 } })
    expect(w.find('[data-test=project-links]').exists()).toBe(false)
    expect(w.find('a[href=""]').exists()).toBe(false)
  })

  it('renders external links with rel and ↗', async () => {
    const w = await mountSuspended(ProjectCard, { props: { project: p(), index: 1 } })
    const a = w.find('[data-test=project-links] a[href="https://example.com"]')
    expect(a.attributes('target')).toBe('_blank')
    expect(a.attributes('rel')).toBe('noopener noreferrer')
    expect(a.find('[aria-hidden="true"]').text()).toContain('↗')
  })

  it('does not render a status pill when status is empty', async () => {
    const w = await mountSuspended(ProjectCard, { props: { project: p({ status: '' }), index: 1 } })
    expect(w.find('[data-test=project-status]').exists()).toBe(false)
  })

  it('shows the index as two digits and links to the case study', async () => {
    const w = await mountSuspended(ProjectCard, {
      props: { project: p({ path: '/proyek/abc' }), index: 1 },
    })
    expect(w.find('[data-test=project-index]').text()).toBe('01')
    const cs = w.findAll('a').find(a => a.text().includes('Studi kasus'))
    expect(cs?.attributes('href')).toBe('/proyek/abc')
  })

  it('hides the "Membuktikan" line when proves is empty', async () => {
    const w = await mountSuspended(ProjectCard, { props: { project: p({ proves: '' }), index: 1 } })
    expect(w.find('[data-test=project-proves]').exists()).toBe(false)
  })

  it('shows the "Membuktikan" line when proves is filled', async () => {
    const w = await mountSuspended(ProjectCard, { props: { project: p(), index: 1 } })
    expect(w.find('[data-test=project-proves]').text()).toBe('Membuktikan: sesuatu.')
  })

  it('has no case study link when caseStudy is false', async () => {
    const w = await mountSuspended(ProjectCard, {
      props: { project: p({ caseStudy: false }), index: 1 },
    })
    expect(w.findAll('a').some(a => a.text().includes('Studi kasus'))).toBe(false)
    // external links stay
    expect(w.find('[data-test=project-links]').exists()).toBe(true)
  })

  it('renders an <img> with alt for preview "image"', async () => {
    const w = await mountSuspended(ProjectCard, {
      props: { project: p({ preview: 'image', image: '/shot.png', title: 'Foto' }), index: 2 },
    })
    const img = w.find('img')
    expect(img.attributes('src')).toBe('/shot.png')
    expect(img.attributes('alt')).toBe('Foto')
    expect(img.attributes('loading')).toBe('lazy')
  })
})
