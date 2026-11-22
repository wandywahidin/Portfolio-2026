import { describe, it, expect } from 'vitest'
import {
  selectHomeProjects,
  formatProjectCount,
  projectsHeading,
  type Project,
} from '~/utils/projects'

function p(over: Partial<Project> = {}): Project {
  return {
    path: '/proyek/x',
    title: 'X',
    order: 1,
    featured: false,
    proves: 'Membuktikan: x',
    summary: 's',
    tags: [],
    status: '',
    links: [],
    preview: 'ui',
    published: true,
    ...over,
  }
}

describe('selectHomeProjects', () => {
  it('returns nothing when all are unpublished', () => {
    const all = [p({ published: false }), p({ published: false, order: 2 })]
    expect(selectHomeProjects(all)).toEqual({ featured: null, rest: [], count: 0 })
  })

  it('makes the single published project featured', () => {
    const one = p({ title: 'A', order: 2 })
    const r = selectHomeProjects([p({ published: false, order: 1 }), one])
    expect(r.featured).toBe(one)
    expect(r.rest).toEqual([])
    expect(r.count).toBe(1)
  })

  it('without featured flags, lowest order is featured and rest is sorted', () => {
    const r = selectHomeProjects([p({ order: 3 }), p({ order: 1 }), p({ order: 2 })])
    expect(r.featured!.order).toBe(1)
    expect(r.rest.map(x => x.order)).toEqual([2, 3])
    expect(r.count).toBe(3)
  })

  it('a featured:true project wins over a lower-order non-featured one', () => {
    const r = selectHomeProjects([p({ order: 1 }), p({ order: 2, featured: true })])
    expect(r.featured!.order).toBe(2)
    expect(r.rest.map(x => x.order)).toEqual([1])
  })

  it('with two featured:true, lowest order wins and the other goes to rest', () => {
    const r = selectHomeProjects([
      p({ order: 4, featured: true }),
      p({ order: 2, featured: true }),
      p({ order: 3 }),
    ])
    expect(r.featured!.order).toBe(2)
    expect(r.rest.map(x => x.order)).toEqual([3, 4])
  })

  it('never includes unpublished projects', () => {
    const hidden = p({ title: 'Hidden', order: 0, featured: true, published: false })
    const r = selectHomeProjects([hidden, p({ order: 1 }), p({ order: 2 })])
    expect(r.featured).not.toBe(hidden)
    expect(r.rest).not.toContain(hidden)
    expect(r.count).toBe(2)
  })
})

describe('formatProjectCount', () => {
  it('pads to two digits', () => {
    expect(formatProjectCount(1)).toBe('01 proyek')
    expect(formatProjectCount(3)).toBe('03 proyek')
    expect(formatProjectCount(12)).toBe('12 proyek')
  })
})

describe('projectsHeading', () => {
  it('matches the count', () => {
    expect(projectsHeading(1)).toBe('Proyek pilihan.')
    expect(projectsHeading(2)).toBe('Dua proyek, masing-masing membuktikan satu hal.')
    expect(projectsHeading(3)).toBe('Tiga proyek, masing-masing membuktikan satu hal.')
    expect(projectsHeading(4)).toBe('4 proyek, masing-masing membuktikan satu hal.')
  })
})
