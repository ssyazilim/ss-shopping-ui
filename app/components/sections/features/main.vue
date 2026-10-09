<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    description?: string
    layout?: "split" | "split-reverse" | "stacked" | "centered" | "sidebar"
    itemStyle?: "inline" | "stacked" | "box-top" | "box-side"
    imageStyle?: "plain" | "frame" | "panel"
    columns?: "2" | "3"
    features?: { name: string; description: string; icon?: string; to?: string; linkText?: string }[]
    image?: string
    imageDark?: string
    imageAlt?: string
    isContent?: boolean
  }>(),
  {
    eyebrow: "",
    title: "",
    description: "",
    layout: "split",
    itemStyle: "inline",
    imageStyle: "plain",
    columns: "3",
    features: () => [],
    image: "",
    imageDark: "",
    imageAlt: "",
    isContent: false,
  }
)

// COMPUTED
const split = computed(() => props.layout === "split" || props.layout === "split-reverse")
const sidebar = computed(() => props.layout === "sidebar")
const centered = computed(() => props.layout === "centered")
const wide = computed(() => !split.value)
const sources = computed(() => {
  if (!props.image) return []
  if (!props.imageDark) return [{ src: props.image, class: "" }]
  return [
    { src: props.image, class: "dark:hidden" },
    { src: props.imageDark, class: "hidden dark:block" },
  ]
})
const reverse = computed(() => props.layout === "split-reverse" && sources.value.length > 0)
const classes = computed(() => {
  if (split.value)
    return {
      grid: [
        "mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none",
        { "lg:grid-cols-2": sources.value.length },
      ],
      text: reverse.value ? "lg:ms-auto lg:ps-4 lg:pt-4" : "lg:pe-8 lg:pt-4",
      heading: "lg:max-w-lg",
      media:
        props.imageStyle === "panel"
          ? { "lg:order-first": reverse.value }
          : { "flex items-start justify-end lg:order-first": reverse.value },
      image:
        props.imageStyle === "panel"
          ? ""
          : ["w-[48rem] max-w-none flex-none sm:w-[57rem]", { "md:-ms-4 lg:ms-0": !reverse.value }],
    }
  return {
    grid: sidebar.value
      ? "mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5"
      : "",
    text: sidebar.value ? "lg:col-span-2" : "",
    heading: sidebar.value
      ? ""
      : centered.value
        ? "mx-auto max-w-2xl lg:text-center"
        : "mx-auto max-w-2xl lg:mx-0",
    media: "",
    image: "",
  }
})
const gridList = computed(() => [
  "mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 sm:mt-20 sm:grid-cols-2 lg:gap-y-16",
  props.columns === "2" ? "lg:max-w-4xl" : "lg:max-w-none lg:grid-cols-3",
  { "lg:mx-0": !centered.value },
])
</script>

<template>
  <div class="overflow-hidden py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div :class="classes.grid">
        <div :class="classes.text">
          <div :class="classes.heading">
            <p
              v-if="isContent ? $slots.eyebrow : eyebrow"
              class="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400"
            >
              <slot v-if="isContent" name="eyebrow" />
              <template v-else>{{ eyebrow }}</template>
            </p>
            <h2
              v-if="isContent ? $slots.title : title"
              class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 first:mt-0 sm:text-5xl dark:text-white"
              :class="{ 'lg:text-balance': centered }"
            >
              <slot v-if="isContent" name="title" />
              <template v-else>{{ title }}</template>
            </h2>
            <p
              v-if="isContent ? $slots.default : description"
              class="mt-6 text-lg/8 text-gray-700 first:mt-0 dark:text-gray-300"
            >
              <slot v-if="isContent" />
              <template v-else>{{ description }}</template>
            </p>
            <div
              v-if="$slots.links"
              class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 text-gray-900 first:mt-0 dark:text-white"
              :class="{ 'lg:justify-center': centered }"
            >
              <slot name="links" />
            </div>
            <sections-features-list
              v-if="!wide"
              :features="features"
              :item-style="itemStyle"
              class="mt-10 max-w-xl space-y-8 first:mt-0 lg:max-w-none"
            />
          </div>
        </div>

        <sections-features-list
          v-if="sidebar"
          :features="features"
          :item-style="itemStyle"
          class="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-3 lg:gap-y-16"
        />

        <div v-if="!wide && sources.length" :class="classes.media">
          <sections-features-image
            :sources="sources"
            :alt="imageAlt"
            :image-style="imageStyle"
            :class="classes.image"
          />
        </div>
      </div>

      <sections-features-image
        v-if="wide && imageStyle !== 'plain' && sources.length"
        :sources="sources"
        :alt="imageAlt"
        :image-style="imageStyle"
        class="mt-16 sm:mt-20"
      />
    </div>

    <div
      v-if="wide && imageStyle === 'plain' && sources.length"
      class="relative overflow-hidden pt-16 [mask-image:linear-gradient(to_top,transparent,black_15%)]"
    >
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <img
          v-for="source in sources"
          :key="source.src"
          :src="source.src"
          :alt="imageAlt"
          class="mb-[-12%] w-full rounded-xl shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10"
          :class="source.class"
        />
      </div>
    </div>

    <div v-if="wide && !sidebar" class="mx-auto max-w-7xl px-6 lg:px-8">
      <sections-features-list :features="features" :item-style="itemStyle" :class="gridList" />
    </div>
  </div>
</template>
