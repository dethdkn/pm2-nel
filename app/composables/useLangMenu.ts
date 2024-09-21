export default () => {
  const { locale, locales, setLocale, setLocaleCookie } = useI18n()
  return computed(() => [locales.value.map(l => ({
    label: l.name || 'lang',
    icon: l.flag,
    click: () => {
      setLocale(l.code)
      setLocaleCookie(l.code)
    },
    disabled: locale.value === l.code,
  }))])
}
