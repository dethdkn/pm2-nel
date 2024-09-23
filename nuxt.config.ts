export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  modules: ['@nuxt/fonts', '@nuxt/image', '@nuxt/ui', '@nuxtjs/i18n', '@vueuse/nuxt', 'nuxt-auth-utils'],
  i18n: {
    defaultLocale: 'en',
    langDir: 'locales',
    locales: [
      { code: 'en', language: 'en-US', name: 'English (US)', flag: 'flag:us-4x3', file: 'en-US.json' },
      { code: 'pt', language: 'pt-BR', name: 'Português (BR)', flag: 'flag:br-4x3', file: 'pt-BR.json' },
    ],
    experimental: { localeDetector: './server/localeDetector.ts' },
  },
  runtimeConfig: { mongoUrl: '' },
  nitro: {
    imports: { presets: [
      { from: 'drizzle-orm', imports: ['eq', 'asc', 'desc', 'ilike', 'isNotNull', 'or'] },
    ] },
    experimental: { database: true, tasks: true, websocket: true },
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-09-08',
})
