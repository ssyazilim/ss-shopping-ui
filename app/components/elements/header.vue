<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    description?: string
    size?: "compact" | "large"
    align?: "center" | "start"
    background?: "none" | "blobs" | "grid" | "skew"
    image?: string
    imageDark?: string
    isContent?: boolean
  }>(),
  {
    eyebrow: "",
    title: "",
    description: "",
    size: "compact",
    align: "center",
    background: "none",
    image: "",
    imageDark: "",
    isContent: false,
  }
)

// COMPUTED
const large = computed(() => props.size === "large")
const centered = computed(() => props.align === "center")
const sources = computed(() => {
  if (!props.image) return []
  if (!props.imageDark) return [{ src: props.image, class: "" }]
  return [
    { src: props.image, class: "dark:hidden" },
    { src: props.imageDark, class: "hidden dark:block" },
  ]
})
</script>

<template>
  <div class="relative isolate overflow-hidden" :class="large ? 'py-24 sm:py-32' : 'py-3 sm:py-4'">
    <img
      v-for="source in sources"
      :key="source.src"
      :src="source.src"
      alt=""
      class="absolute inset-0 -z-10 size-full object-cover opacity-10 dark:opacity-25"
      :class="source.class"
    />
    <sections-decorations-blobs v-if="background === 'blobs'" />
    <sections-decorations-grid v-else-if="background === 'grid'" />
    <sections-decorations-skew v-else-if="background === 'skew'" />

    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl" :class="centered ? 'text-center' : 'lg:mx-0'">
        <p
          v-if="isContent ? $slots.eyebrow : eyebrow"
          class="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400"
        >
          <slot v-if="isContent" name="eyebrow" />
          <template v-else>{{ eyebrow }}</template>
        </p>
        <h1
          v-if="isContent ? $slots.title : title"
          class="mt-2 text-5xl font-semibold tracking-tight text-gray-900 first:mt-0 dark:text-white"
          :class="large ? 'sm:text-7xl' : 'sm:text-6xl'"
        >
          <slot v-if="isContent" name="title" />
          <template v-else>{{ title }}</template>
        </h1>
        <p
          v-if="isContent ? $slots.default : description"
          class="text-pretty text-lg font-medium first:mt-0 sm:text-xl/8 dark:text-gray-400"
          :class="[large ? 'mt-8' : 'mt-4', sources.length ? 'text-gray-700' : 'text-gray-500']"
        >
          <slot v-if="isContent" />
          <template v-else>{{ description }}</template>
        </p>
      </div>
      <div
        v-if="$slots.links"
        class="mx-auto mt-10 flex max-w-2xl flex-wrap items-center gap-x-8 gap-y-4 text-gray-900 lg:max-w-none dark:text-white"
        :class="centered ? 'justify-center' : 'lg:mx-0'"
      >
        <slot name="links" />
      </div>
    </div>
  </div>
</template>
