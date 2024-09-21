export default defineI18nLocaleDetector((event, config) => {
  const cookie = tryCookieLocale(event, { lang: '', name: 'i18n_redirected' })

  if(cookie) return cookie.toString()

  return config.defaultLocale
})
