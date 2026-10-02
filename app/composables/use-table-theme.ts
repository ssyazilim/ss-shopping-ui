export const useTableTheme = () => {
  const colorMode = useColorMode()
  const theme = computed(() => (colorMode.value === "dark" ? "dark" : "light"))

  return { theme }
}
