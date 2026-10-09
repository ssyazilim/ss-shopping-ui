export const triggerNewWindow = (url: string) => {
  const width = window.innerWidth
  const height = window.innerHeight
  const screenWidth = Math.floor(width / 2)
  const screenHeight = Math.floor(height / 1.1)
  const left = (width - screenWidth) / 2
  const top = (height - screenHeight) / 2
  window.open(url, "_blank", `width=${screenWidth}, height=${screenHeight}, left=${left}, top=${top}`)
}
