import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'

describe('e2e fixture safety', () => {
  it('content/proyek/contoh.md (copied by e2e tests) is git-ignored so it can never be deployed', () => {
    const root = resolve(__dirname, '..')
    let ignored = true
    try {
      execFileSync('git', ['check-ignore', '-q', 'content/proyek/contoh.md'], { cwd: root })
    }
    catch {
      ignored = false
    }
    expect(ignored).toBe(true)
  })
})
