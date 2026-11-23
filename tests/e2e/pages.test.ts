import { existsSync, rmSync } from 'node:fs'
import { gunzipSync } from 'node:zlib'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch, fetch } from '@nuxt/test-utils/e2e'

const rootDir = fileURLToPath(new URL('../..', import.meta.url))
const leftover = fileURLToPath(new URL('../../content/proyek/contoh.md', import.meta.url))
if (existsSync(leftover)) rmSync(leftover)

describe('pages (semua proyek belum published)', async () => {
  await setup({ rootDir, server: true, browser: false })

  it('GET / renders hero with lang="id" and no projects section', async () => {
    const html = await $fetch<string>('/')
    expect(html).toMatch(/<html\s+lang="id"/)
    expect(html).toContain('Antarmuka yang andal untuk produk keuangan.')
    expect(html).not.toContain('id="proyek"')
    expect(html).not.toContain('00 proyek')
    expect(html).not.toContain('Lihat proyek')
    // "@wandy29/ui v0.1" in the spec sheet is fine; the project card title is not.
    expect(html).not.toContain('Membuktikan: saya bisa membangun fondasi')
  })

  it('is noindex by default (pre-release gate)', async () => {
    const html = await $fetch<string>('/')
    expect(html).toMatch(/<meta name="robots" content="noindex, nofollow">/)
  })

  it('GET /proyek/wandy-ui (unpublished) → 404', async () => {
    const res = await fetch('/proyek/wandy-ui', { headers: { accept: 'text/html' } })
    expect(res.status).toBe(404)
    const body = await res.text()
    expect(body).not.toContain('Membuktikan: saya bisa membangun fondasi')
  })

  it('client content dump does not leak unpublished projects', async () => {
    const res = await fetch('/__nuxt_content/proyek/sql_dump.txt')
    const raw = await res.text()
    expect(res.ok, 'content dump URL must exist, otherwise this leak check is vacuous').toBe(true)
    const sql = gunzipSync(Buffer.from(raw, 'base64')).toString('utf8')
    expect(sql).not.toContain('Pembuat Panduan Interaktif')
    expect(sql).not.toContain('Membuktikan: saya bisa membangun fondasi')
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
