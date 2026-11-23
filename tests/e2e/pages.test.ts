import { existsSync, rmSync } from 'node:fs'
import { gunzipSync } from 'node:zlib'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch, fetch } from '@nuxt/test-utils/e2e'

const rootDir = fileURLToPath(new URL('../..', import.meta.url))
const leftover = fileURLToPath(new URL('../../content/proyek/contoh.md', import.meta.url))
if (existsSync(leftover)) rmSync(leftover)

// Keadaan konten saat ini: hanya wandy-ui.md yang published.
describe('pages (konten saat ini)', async () => {
  await setup({ rootDir, server: true, browser: false })

  it('GET / renders hero with lang="id" and the one published project', async () => {
    const html = await $fetch<string>('/')
    expect(html).toMatch(/<html\s+lang="id"/)
    expect(html).toContain('Antarmuka yang andal untuk produk keuangan.')
    expect(html).toContain('id="proyek"')
    expect(html).toContain('01 proyek')
    expect(html).toContain('Proyek pilihan.')
    expect(html).toContain('Membuktikan: saya bisa membangun fondasi')
    // unpublished ones stay hidden
    expect(html).not.toContain('WLane')
    expect(html).not.toContain('Aplikasi Keuangan UMKM')
  })

  it('is noindex by default (pre-release gate)', async () => {
    const html = await $fetch<string>('/')
    expect(html).toMatch(/<meta name="robots" content="noindex, nofollow">/)
  })

  it('GET /proyek/wandy-ui (published) → 200 with the title in h1', async () => {
    const res = await fetch('/proyek/wandy-ui')
    expect(res.status).toBe(200)
    expect(await res.text()).toMatch(/<h1[^>]*>\s*@wandy29\/ui\s*<\/h1>/)
  })

  it('GET /proyek/wlane (unpublished) → 404', async () => {
    const res = await fetch('/proyek/wlane', { headers: { accept: 'text/html' } })
    expect(res.status).toBe(404)
    expect(await res.text()).not.toContain('Membuktikan: saya bisa mengirim produk utuh')
  })

  it('client content dump does not leak unpublished projects', async () => {
    const res = await fetch('/__nuxt_content/proyek/sql_dump.txt')
    const raw = await res.text()
    expect(res.ok, 'content dump URL must exist, otherwise this leak check is vacuous').toBe(true)
    const sql = gunzipSync(Buffer.from(raw, 'base64')).toString('utf8')
    expect(sql).not.toContain('WLane')
    expect(sql).not.toContain('Membuktikan: saya bisa mengirim produk utuh')
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
