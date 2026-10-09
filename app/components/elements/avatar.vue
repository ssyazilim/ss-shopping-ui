<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    // Used for the initials when there is no image
    name?: string
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
    shape?: "circle" | "rounded"
  }>(),
  {
    src: "",
    alt: "",
    name: "",
    size: "md",
    shape: "circle",
  }
)

// DATA
const { locale } = useI18n()
const sizes = { xs: "size-6", sm: "size-8", md: "size-10", lg: "size-12", xl: "size-14", "2xl": "size-16" }
const texts = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
}
const frame = "outline outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10"

// COMPUTED
const radius = computed(() => (props.shape === "rounded" ? "rounded-md" : "rounded-full"))
// "ilker yılmaz" → "İY" in Turkish; the locale decides the upper case
const initials = computed(() =>
  props.name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toLocaleUpperCase(locale.value))
    .join("")
)
</script>

<template>
  <img
    v-if="src"
    :src="src"
    :alt="alt"
    class="inline-block shrink-0 bg-gray-100 object-cover dark:bg-gray-800"
    :class="[sizes[size], radius, frame]"
  />
  <span
    v-else-if="initials"
    role="img"
    :aria-label="alt || name"
    class="inline-flex shrink-0 items-center justify-center bg-gray-500 dark:bg-gray-800"
    :class="[sizes[size], radius, frame]"
  >
    <span class="font-medium text-white" :class="texts[size]" aria-hidden="true">{{ initials }}</span>
  </span>
  <span
    v-else
    :role="alt ? 'img' : undefined"
    :aria-label="alt || undefined"
    class="inline-block shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-800"
    :class="[sizes[size], radius, frame]"
  >
    <svg
      class="size-full text-gray-300 dark:text-gray-600"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  </span>
</template>
