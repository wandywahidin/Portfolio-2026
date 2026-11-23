import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

const rootDir = fileURLToPath(new URL('../..', import.meta.url))

describe('pages (NUXT_PUBLIC_INDEXABLE=true)', async () => {
  await setup({ rootDir, server: true, browser: false, env: { NUXT_PUBLIC_INDEXABLE: 'true' } })

  it('does not emit the noindex meta', async () => {
    const html = await $fetch<string>('/')
    expect(html).not.toContain('noindex')
  })
})
