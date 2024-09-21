export default () => {
  const { t } = useI18n()
  const colorMode = useColorMode()

  return computed(() => [[
    { label: t('general.system'), icon: 'i-heroicons-computer-desktop-20-solid', click: () => colorMode.preference = 'system', disabled: colorMode.preference === 'system' },
    { label: t('general.light'), icon: 'i-heroicons-sun-20-solid', click: () => colorMode.preference = 'light', disabled: colorMode.preference === 'light' },
    { label: t('general.dark'), icon: 'i-heroicons-moon-20-solid', click: () => colorMode.preference = 'dark', disabled: colorMode.preference === 'dark' },
  ]])
}
