import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const proyekDir = join(dirname(fileURLToPath(import.meta.url)), 'content', 'proyek')

/**
 * File yang frontmatter-nya tidak `published: true` dikeluarkan dari collection,
 * supaya tidak ikut ke database/dump yang dikirim ke browser.
 */
function unpublishedProjects(): string[] {
  let files: string[] = []
  try {
    files = readdirSync(proyekDir).filter(f => f.endsWith('.md'))
  }
  catch {
    return []
  }
  return files
    .filter((f) => {
      const src = readFileSync(join(proyekDir, f), 'utf8')
      const front = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
      return !/^published:\s*true\s*$/m.test(front)
    })
    .map(f => `proyek/${f}`)
}

export default defineContentConfig({
  collections: {
    proyek: defineCollection({
      type: 'page',
      source: {
        include: 'proyek/*.md',
        exclude: unpublishedProjects(),
      },
      schema: z.object({
        title: z.string(),
        order: z.number(),
        featured: z.boolean().default(false),
        proves: z.string(),
        summary: z.string(),
        tags: z.array(z.string()),
        status: z.string(),
        links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
        preview: z.enum(['ui', 'guide', 'umkm', 'image']),
        image: z.string().optional(),
        published: z.boolean().default(false),
      }),
    }),
  },
})
