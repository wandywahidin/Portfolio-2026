export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  path: string
  title: string
  order: number
  featured: boolean
  proves: string
  summary: string
  tags: string[]
  status: string
  links: ProjectLink[]
  preview: 'ui' | 'guide' | 'umkm' | 'image'
  image?: string
  published: boolean
}

export interface HomeProjects {
  featured: Project | null
  rest: Project[]
  count: number
}

const byOrder = (a: Project, b: Project) => a.order - b.order

export function selectHomeProjects(all: Project[]): HomeProjects {
  const visible = all.filter(p => p.published === true).sort(byOrder)
  if (visible.length === 0) return { featured: null, rest: [], count: 0 }

  const featured = visible.find(p => p.featured) ?? visible[0]!
  const rest = visible.filter(p => p !== featured)
  return { featured, rest, count: visible.length }
}

export function formatProjectCount(n: number): string {
  return `${String(n).padStart(2, '0')} proyek`
}

const WORDS: Record<number, string> = { 2: 'Dua', 3: 'Tiga' }

export function projectsHeading(n: number): string {
  if (n === 1) return 'Proyek pilihan.'
  return `${WORDS[n] ?? n} proyek, masing-masing membuktikan satu hal.`
}
