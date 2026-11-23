import { readdirSync, readFileSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { describe, it, expect } from 'vitest'

const dir = resolve(__dirname, '../../app/components/ui')
const files = readdirSync(dir).filter(f => f.endsWith('.vue') || f.endsWith('.ts'))

describe('components/ui boundary (calon @wandy/ui)', () => {
  it('has components to check', () => {
    expect(files.length).toBeGreaterThan(0)
  })
  for (const f of files) {
    const src = readFileSync(join(dir, f), 'utf8')
    it(`${f} does not import website code`, () => {
      expect(src).not.toContain('components/site')
      expect(src).not.toContain('queryCollection')
    })
    it(`${f} has no hard-coded hex colors`, () => {
      expect(src).not.toMatch(/#[0-9a-fA-F]{3,6}\b/)
    })
  }
})
