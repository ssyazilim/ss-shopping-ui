import type { ModuleOptions } from "@vite-pwa/nuxt"

const scope = "/"
const mainCompany = process.env.NUXT_PUBLIC_MAIN_COMPANY || ""
const firstLetter = mainCompany.charAt(0) || ""
const generateIcon = (size: string) =>
  `https://ui-avatars.com/api/?name=${firstLetter}&size=${size}&font-size=0.6&length=1&bold=true&background=4f46e5&color=f9fafb&uppercase=true&rounded=true`

export const pwa: ModuleOptions = {
  registerType: "autoUpdate",
  scope,
  base: scope,
  selfDestroying: true,
  manifest: {
    id: scope,
    scope,
    name: mainCompany,
    short_name: firstLetter,
    description: "Yeni nesil E-ticaret sistemi",
    theme_color: "#ffffff",
    icons: [
      { type: "image/png", sizes: "64x64", src: `${generateIcon("64")}` },
      { type: "image/png", sizes: "128x128", src: `${generateIcon("128")}` },
      { type: "image/png", sizes: "144x144", src: `${generateIcon("144")}` },
      { type: "image/png", sizes: "152x152", src: `${generateIcon("152")}` },
      { type: "image/png", sizes: "192x192", src: `${generateIcon("192")}` },
      { type: "image/png", sizes: "384x384", src: `${generateIcon("384")}` },
      { type: "image/png", sizes: "512x512", src: `${generateIcon("512")}` },
    ],
  },
  workbox: {
    globPatterns: ["**/*.{js,css,html,txt,png,ico,svg}"],
    navigateFallbackDenylist: [/^\/api\//],
    navigateFallback: "/",
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts.googleapis.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts.gstatic.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "gstatic-fonts-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  registerWebManifestInRouteRules: true,
  writePlugin: true,
  devOptions: {
    enabled: false,
    navigateFallback: scope,
    suppressWarnings: true,
    navigateFallbackAllowlist: [/^\/$/],
    type: "module",
  },
}
