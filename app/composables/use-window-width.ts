export const useWindowWidth = () => {
  const width = ref(Infinity)
  const update = () => (width.value = window.innerWidth)

  onMounted(() => {
    update()
    window.addEventListener("resize", update)
  })
  onUnmounted(() => window.removeEventListener("resize", update))

  return { width }
}
