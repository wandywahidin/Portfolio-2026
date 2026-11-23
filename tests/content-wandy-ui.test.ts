import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'

// Fakta yang sudah terverifikasi (2026-11-22):
// paket terbit di npm sebagai @wandy29/ui v0.1.0, docs Storybook di GitHub Pages,
// dan website ini BELUM memakai paket itu (masih components/ui lokal).
const src = readFileSync(resolve(__dirname, '../content/proyek/wandy-ui.md'), 'utf8')
const front = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)![1]
const field = (k: string) => front.match(new RegExp(`^${k}:\\s*(.*)$`, 'm'))?.[1] ?? ''

describe('content/proyek/wandy-ui.md', () => {
  it('memakai nama paket npm yang sebenarnya', () => {
    expect(field('title')).toBe('"@wandy29/ui"')
  })

  it('tidak mengklaim website ini sudah memakai paketnya', () => {
    expect(field('summary')).not.toMatch(/website ini memakainya/)
  })

  it('status jujur: versi yang benar-benar terbit', () => {
    expect(field('status')).toBe('"v0.1.0 di npm"')
  })

  it('menautkan Storybook, GitHub, dan npm yang nyata', () => {
    const links = front.match(/^links:\s*\n((?:\s+-.*\n?|\s+\w+:.*\n?)+)/m)?.[1] ?? ''
    expect(links).toContain('https://wandywahidin.github.io/wandy-ui/')
    expect(links).toContain('https://github.com/wandywahidin/wandy-ui')
    expect(links).toContain('https://www.npmjs.com/package/@wandy29/ui')
  })

  it('sudah published, studi kasusnya dimatikan dulu', () => {
    expect(field('published')).toBe('true')
    expect(field('caseStudy')).toBe('false')
  })
})

describe('app.config kontak', () => {
  const cfg = readFileSync(resolve(__dirname, '../app/app.config.ts'), 'utf8')
  it('mengisi GitHub dan npm dengan akun yang nyata', () => {
    expect(cfg).toMatch(/github:\s*'https:\/\/github\.com\/wandywahidin'/)
    expect(cfg).toMatch(/npm:\s*'https:\/\/www\.npmjs\.com\/package\/@wandy29\/ui'/)
  })
})
