import { copyFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, it, expect, afterAll } from 'vitest'
import { setup, $fetch, fetch } from '@nuxt/test-utils/e2e'

const rootDir = fileURLToPath(new URL('../..', import.meta.url))
const fixture = fileURLToPath(new URL('../fixtures/proyek/contoh.md', import.meta.url))
const target = fileURLToPath(new URL('../../content/proyek/contoh.md', import.meta.url))

copyFileSync(fixture, target)

// Fixture contoh.md + wandy-ui.md + wlane.md = tiga proyek published.
describe('pages (fixture dengan studi kasus aktif)', async () => {
  afterAll(() => rmSync(target, { force: true }))

  await setup({ rootDir, server: true, browser: false })

  it('GET / shows all published projects in the grid layout', async () => {
    const html = await $fetch<string>('/')
    expect(html).toContain('Contoh Proyek')
    expect(html).toContain('@wandy29/ui')
    expect(html).toContain('WLane')
    expect(html).toContain('03 proyek')
    expect(html).toContain('Tiga proyek, masing-masing membuktikan satu hal.')
    expect(html).toContain('data-test="project-grid"')
    // only the fixture still has its case study enabled
    expect(html).toContain('href="/proyek/contoh"')
    expect(html).not.toContain('href="/proyek/wandy-ui"')
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
