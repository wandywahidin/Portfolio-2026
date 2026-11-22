import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  content: {
    experimental: { sqliteConnector: 'native' },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      htmlAttrs: { lang: 'id' },
    },
  },
  nitro: {
    prerender: { crawlLinks: true },
  },
})
