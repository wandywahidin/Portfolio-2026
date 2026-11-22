import { defineConfig } from 'vitest/config'
import { defineVitestProject } from '@nuxt/test-utils/config'

export default defineConfig({
  test: {
    // e2e files build the app against content/; they must not run concurrently.
    fileParallelism: false,
    projects: [
      await defineVitestProject({
        test: {
          name: 'unit',
          include: ['tests/**/*.test.ts'],
          exclude: ['tests/e2e/**'],
          environment: 'nuxt',
        },
      }),
      {
        test: {
          name: 'e2e',
          include: ['tests/e2e/**/*.test.ts'],
          environment: 'node',
          testTimeout: 60_000,
          hookTimeout: 300_000,
        },
      },
    ],
  },
})
