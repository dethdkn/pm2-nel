import process from 'node:process'

const { SITE_URL } = process.env

export default defineNuxtConfig({
  modules: ['@nuxt/fonts', '@nuxt/image', '@nuxt/ui', '@nuxtjs/seo', '@nuxtjs/i18n', '@vueuse/nuxt', 'nuxt-auth-utils'],
  app: { head: { templateParams: { separator: '•' } } },
  i18n: {
    baseUrl: SITE_URL,
    defaultLocale: 'en',
    langDir: 'locales',
    locales: [
      { code: 'en', language: 'en-US', name: 'English (US)', file: 'en-US.json' },
      { code: 'pt', language: 'pt-BR', name: 'Português (BR)', file: 'pt-BR.json' },
    ],
  },
  site: {
    url: SITE_URL,
    name: 'Horus',
    description: 'PM2 plus alternative',
    defaultLocale: 'en',
  },
  robots: { disallow: '*' },
  sitemap: { enabled: false },
  linkChecker: { enabled: false },
  nitro: { experimental: { tasks: true } },
  devtools: { enabled: true },
  compatibilityDate: '2024-09-08',
})
