import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'

// Fakta terverifikasi (2026-11-23): aplikasi live di https://w-lane.vercel.app/,
// kode di https://github.com/wandywahidin/WLane (publik), nama produk "WLane".
const dir = resolve(__dirname, '../content/proyek')
const file = resolve(dir, 'wlane.md')

describe('content/proyek/wlane.md', () => {
  it('menggantikan panduan-interaktif.md (slug /proyek/wlane)', () => {
    expect(existsSync(file)).toBe(true)
    expect(existsSync(resolve(dir, 'panduan-interaktif.md'))).toBe(false)
  })

  const src = existsSync(file) ? readFileSync(file, 'utf8') : ''
  const front = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
  const field = (k: string) => front.match(new RegExp(`^${k}:\\s*(.*)$`, 'm'))?.[1] ?? ''

  it('memakai nama produk WLane', () => {
    expect(field('title')).toBe('"WLane"')
  })

  it('status menyebut aplikasinya sudah live', () => {
    expect(field('status')).toBe('"Live"')
  })

  it('menautkan aplikasi live dan repo GitHub', () => {
    expect(front).toContain('url: "https://w-lane.vercel.app/"')
    expect(front).toContain('url: "https://github.com/wandywahidin/WLane"')
  })

  it('tetap belum published sampai drafnya ditinjau', () => {
    expect(field('published')).toBe('false')
  })
})
