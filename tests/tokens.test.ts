import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'

const cssPath = resolve(__dirname, '../app/assets/css/main.css')

const colors: Record<string, string> = {
  bg: '#F5F4EF',
  surface: '#FFFFFF',
  ink: '#14161A',
  muted: '#5B5F66',
  line: '#E2E0D8',
  accent: '#0E6B50',
  'accent-soft': '#E3F0EA',
  'on-accent': '#FFFFFF',
}

function themeBlock(): string {
  expect(existsSync(cssPath), 'main.css exists').toBe(true)
  const css = readFileSync(cssPath, 'utf8')
  const m = css.match(/@theme\s*\{([\s\S]*?)\}/)
  expect(m, '@theme block').not.toBeNull()
  return m![1]
}

describe('design tokens', () => {
  for (const [name, hex] of Object.entries(colors)) {
    it(`defines --color-${name}: ${hex}`, () => {
      expect(themeBlock()).toContain(`--color-${name}: ${hex};`)
    })
  }
  it('uses Plus Jakarta Sans for sans', () => {
    expect(themeBlock()).toMatch(/--font-sans:[^;]*"Plus Jakarta Sans"/)
  })
  it('uses Geist Mono for mono', () => {
    expect(themeBlock()).toMatch(/--font-mono:[^;]*"Geist Mono"/)
  })
})
