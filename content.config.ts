import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    proyek: defineCollection({
      type: 'page',
      source: 'proyek/*.md',
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
