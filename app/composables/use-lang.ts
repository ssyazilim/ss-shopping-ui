export const useLang = () => {
  const { t } = useI18n()
  return { t }
}

export const useT = (key: string) => {
  const { $i18n } = useNuxtApp()
  return ($i18n as { t: (key: string) => string }).t(key)
}
