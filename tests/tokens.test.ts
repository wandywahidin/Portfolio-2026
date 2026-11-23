import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'

const cssPath = resolve(__dirname, '../app/assets/css/main.css')

const colors: Record<string, string> = {
  bg: '#F5F4EF',
  surface: '#FFFFFF',
  ink: '#14161A',
  'muted-foreground': '#5B5F66',
  line: '#E2E0D8',
  accent: '#0E6B50',
  'accent-soft': '#E3F0EA',
  'on-accent': '#FFFFFF',
}

function css(): string {
  expect(existsSync(cssPath), 'main.css exists').toBe(true)
  return readFileSync(cssPath, 'utf8')
}

function themeBlock(): string {
  const m = css().match(/@theme\s*\{([\s\S]*?)\}/)
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

describe('@wandy29/tokens', () => {
  it('imports the library theme before the site theme, so site fonts win', () => {
    const src = css()
    const lib = src.indexOf('@import "@wandy29/tokens/theme.css"')
    expect(lib).toBeGreaterThan(-1)
    expect(lib).toBeLessThan(src.search(/@theme\s*\{/))
  })
  it('scans the library sources for its utility classes', () => {
    expect(css()).toMatch(/@source "[./]*\/node_modules\/@wandy29\/ui\/src"/)
  })
  it('does not redefine --color-muted (the library uses it as a background)', () => {
    expect(themeBlock()).not.toMatch(/--color-muted:/)
  })
  it.each([
    ['background', 'bg'],
    ['surface', 'surface'],
    ['foreground', 'ink'],
    ['muted', 'bg'],
    ['muted-foreground', 'muted-foreground'],
    ['primary', 'accent'],
    ['primary-foreground', 'on-accent'],
    ['ring', 'accent'],
  ])('points --wui-%s at the site token --color-%s', (wui, site) => {
    expect(css()).toContain(`--wui-${wui}: var(--color-${site});`)
  })
})
