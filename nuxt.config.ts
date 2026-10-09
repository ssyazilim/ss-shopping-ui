import { fileURLToPath } from "node:url"
import { pwa } from "./config/pwa"

export default defineNuxtConfig({
  $env: {
    typegen: {
      modules: ["@nuxtjs/i18n", "@nuxtjs/color-mode", "@nuxt/icon"],
      i18n: { strategy: "no_prefix" },
    },
  },

  modules: ["@vite-pwa/nuxt"],

  pwa,

  css: [fileURLToPath(new URL("./app/assets/style/transitions.css", import.meta.url))],

  components: [
    {
      path: fileURLToPath(new URL("./app/components/content", import.meta.url)),
      pathPrefix: false,
      global: true,
    },
    {
      path: fileURLToPath(new URL("./app/components", import.meta.url)),
      ignore: ["content/**"],
    },
  ],

  // Swiper ships web components (swiper-container, swiper-slide), Vue must not resolve them
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("swiper-"),
    },
  },

  vite: {
    optimizeDeps: {
      include: ["swiper/element/bundle"],
    },
    resolve: {
      dedupe: [
        "@formkit/auto-animate",
        "@headlessui/vue",
        "@heroicons/vue",
        "@ssyazilim/ss-shopping-schemas",
        "swiper",
        "vue-i18n",
        "vue-star-rating",
        "vue3-toastify",
      ],
    },
  },
})
