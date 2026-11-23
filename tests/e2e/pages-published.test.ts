import { copyFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, it, expect, afterAll } from 'vitest'
import { setup, $fetch, fetch } from '@nuxt/test-utils/e2e'

const rootDir = fileURLToPath(new URL('../..', import.meta.url))
const fixture = fileURLToPath(new URL('../fixtures/proyek/contoh.md', import.meta.url))
const target = fileURLToPath(new URL('../../content/proyek/contoh.md', import.meta.url))

copyFileSync(fixture, target)

// Fixture contoh.md + wandy-ui.md = dua proyek published.
describe('pages (dua proyek published)', async () => {
  afterAll(() => rmSync(target, { force: true }))

  await setup({ rootDir, server: true, browser: false })

  it('GET / shows both published projects in the grid layout', async () => {
    const html = await $fetch<string>('/')
    expect(html).toContain('Contoh Proyek')
    expect(html).toContain('@wandy29/ui')
    expect(html).toContain('02 proyek')
    expect(html).toContain('Dua proyek, masing-masing membuktikan satu hal.')
    expect(html).toContain('data-test="project-grid"')
    expect(html).not.toContain('WLane')
  })

  it('GET /proyek/contoh → 200 with the title in h1', async () => {
    const res = await fetch('/proyek/contoh')
    expect(res.status).toBe(200)
    const html = await res.text()
    expect(html).toMatch(/<h1[^>]*>\s*Contoh Proyek\s*<\/h1>/)
    expect(html).toContain('Membuktikan: fixture tes.')
    expect(html).toContain('Isi fixture.')
  })

})
