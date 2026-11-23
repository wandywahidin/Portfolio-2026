import { copyFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, it, expect, afterAll } from 'vitest'
import { setup, $fetch, fetch } from '@nuxt/test-utils/e2e'

const rootDir = fileURLToPath(new URL('../..', import.meta.url))
const fixture = fileURLToPath(new URL('../fixtures/proyek/contoh.md', import.meta.url))
const target = fileURLToPath(new URL('../../content/proyek/contoh.md', import.meta.url))

copyFileSync(fixture, target)

describe('pages (satu proyek published)', async () => {
  afterAll(() => rmSync(target, { force: true }))

  await setup({ rootDir, server: true, browser: false })

  it('GET / shows the published project as the only card', async () => {
    const html = await $fetch<string>('/')
    expect(html).toContain('id="proyek"')
    expect(html).toContain('Contoh Proyek')
    expect(html).toContain('01 proyek')
    expect(html).toContain('Proyek pilihan.')
    expect(html).not.toContain('data-test="project-grid"')
    // unpublished ones stay hidden
    expect(html).not.toContain('Pembuat Panduan Interaktif')
  })

  it('GET /proyek/contoh → 200 with the title in h1', async () => {
    const res = await fetch('/proyek/contoh')
    expect(res.status).toBe(200)
    const html = await res.text()
    expect(html).toMatch(/<h1[^>]*>\s*Contoh Proyek\s*<\/h1>/)
    expect(html).toContain('Membuktikan: fixture tes.')
    expect(html).toContain('Isi fixture.')
  })

  it('GET /proyek/wandy-ui is still 404', async () => {
    const res = await fetch('/proyek/wandy-ui', { headers: { accept: 'text/html' } })
    expect(res.status).toBe(404)
  })
})
