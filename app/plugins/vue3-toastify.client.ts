import Vue3Toastify, { toast } from "vue3-toastify"
import type { ToastContainerOptions } from "vue3-toastify"
import "vue3-toastify/dist/index.css"

declare module "#app" {
  interface NuxtApp {
    $toast: typeof toast
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    autoClose: 3000,
    theme: "auto",
  } as ToastContainerOptions)

  return { provide: { toast } }
})
