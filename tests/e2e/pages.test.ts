import { existsSync, rmSync } from 'node:fs'
import { gunzipSync } from 'node:zlib'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch, fetch } from '@nuxt/test-utils/e2e'

const rootDir = fileURLToPath(new URL('../..', import.meta.url))
const leftover = fileURLToPath(new URL('../../content/proyek/contoh.md', import.meta.url))
if (existsSync(leftover)) rmSync(leftover)

// Keadaan konten saat ini: wandy-ui.md dan wlane.md published, studi kasus keduanya dimatikan (caseStudy: false).
describe('pages (konten saat ini)', async () => {
  await setup({ rootDir, server: true, browser: false })

  it('GET / renders hero with lang="id" and the two published projects', async () => {
    const html = await $fetch<string>('/')
    expect(html).toMatch(/<html\s+lang="id"/)
    expect(html).toContain('Antarmuka yang andal untuk produk keuangan.')
    expect(html).toContain('id="proyek"')
    expect(html).toContain('02 proyek')
    expect(html).toContain('@wandy29/ui')
    expect(html).toContain('WLane')
    // case studies are disabled: no links to the detail pages
    expect(html).not.toContain('href="/proyek/')
    // unpublished ones stay hidden
    expect(html).not.toContain('Aplikasi Keuangan UMKM')
  })

  it('is noindex by default (pre-release gate)', async () => {
    const html = await $fetch<string>('/')
    expect(html).toMatch(/<meta name="robots" content="noindex, nofollow">/)
  })

  for (const slug of ['wandy-ui', 'wlane']) {
    it(`GET /proyek/${slug} (caseStudy: false) → 404`, async () => {
      const res = await fetch(`/proyek/${slug}`, { headers: { accept: 'text/html' } })
      expect(res.status).toBe(404)
      expect(await res.text()).toContain('Halaman tidak ditemukan')
    })
  }

  it('client content dump does not leak unpublished projects', async () => {
    const res = await fetch('/__nuxt_content/proyek/sql_dump.txt')
    const raw = await res.text()
    expect(res.ok, 'content dump URL must exist, otherwise this leak check is vacuous').toBe(true)
    const sql = gunzipSync(Buffer.from(raw, 'base64')).toString('utf8')
    expect(sql).not.toContain('Aplikasi Keuangan UMKM')
  })

  it('GET /proyek/tidak-ada → 404 with "Halaman tidak ditemukan"', async () => {
    const res = await fetch('/proyek/tidak-ada', { headers: { accept: 'text/html' } })
    expect(res.status).toBe(404)
    const html = await res.text()
    expect(html).toContain('Halaman tidak ditemukan')
    expect(html).toContain('noindex')
  })

  it('GET /rute-acak → 404 page', async () => {
    const res = await fetch('/rute-acak', { headers: { accept: 'text/html' } })
    expect(res.status).toBe(404)
    expect(await res.text()).toContain('Halaman tidak ditemukan')
  })
})
