import { fileURLToPath } from "node:url"

export default defineNuxtConfig({
  $env: {
    typegen: {
      modules: ["@nuxtjs/i18n", "@nuxtjs/color-mode", "@nuxt/icon"],
      i18n: { strategy: "no_prefix" },
    },
  },

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

  vite: {
    resolve: { dedupe: ["vue-i18n", "@heroicons/vue", "@ssyazilim/ss-shopping-schemas", "vue3-toastify"] },
  },
})
