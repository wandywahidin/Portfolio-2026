import { readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { describe, it, expect } from 'vitest'

const dir = resolve(__dirname, '../content/proyek')
const HEADINGS = ['Masalah', 'Pendekatan', 'Keputusan penting', 'Hasil', 'Yang akan saya lakukan berbeda']

function sections(src: string): Record<string, string> {
  const body = src.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
  const out: Record<string, string> = {}
  const parts = body.split(/^## /m).slice(1)
  for (const p of parts) {
    const nl = p.indexOf('\n')
    const title = (nl === -1 ? p : p.slice(0, nl)).trim()
    out[title] = nl === -1 ? '' : p.slice(nl + 1).trim()
  }
  return out
}

const files = readdirSync(dir).filter(f => f.endsWith('.md') && f !== 'contoh.md')

describe('studi kasus', () => {
  for (const f of files) {
    const src = readFileSync(join(dir, f), 'utf8')
    if (!/^published:\s*true\s*$/m.test(src)) continue
    it(`${f} (published) mengisi kelima bagian`, () => {
      const s = sections(src)
      for (const h of HEADINGS) expect(s[h], `## ${h}`).toBeTruthy()
    })
  }

  it('wandy-ui.md sudah punya draf untuk kelima bagian', () => {
    const s = sections(readFileSync(join(dir, 'wandy-ui.md'), 'utf8'))
    expect(Object.keys(s)).toEqual(HEADINGS)
    for (const h of HEADINGS) expect(s[h], `## ${h}`).toBeTruthy()
  })
})
