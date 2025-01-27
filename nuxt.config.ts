export default defineNuxtConfig({
  modules: ['@nuxt/fonts', '@nuxt/image', '@nuxt/ui', '@nuxtjs/i18n', '@vueuse/nuxt', 'nuxt-auth-utils'],
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-09-08',
  nitro: {
    imports: { presets: [
      { from: 'drizzle-orm', imports: ['eq', 'asc', 'desc', 'ilike', 'isNotNull', 'or'] },
    ] },
    experimental: { database: true, tasks: true, websocket: true },
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'en-US', name: 'English (US)', flag: 'flag:us-4x3', file: 'en-US.json' },
      { code: 'pt', language: 'pt-BR', name: 'Português (BR)', flag: 'flag:br-4x3', file: 'pt-BR.json' },
    ],
    experimental: { localeDetector: 'localeDetector.ts' },
  },
})
