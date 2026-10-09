<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    description?: string
    layout?: "stacked" | "split" | "side"
    statStyle?: "plain" | "bordered" | "tiles" | "cards" | "timeline"
    align?: "start" | "center"
    background?: "none" | "blobs" | "grid" | "skew"
    stats?: { value: string; label: string; description: string }[]
    image?: string
    imageDark?: string
    imageAlt?: string
    isContent?: boolean
  }>(),
  {
    eyebrow: "",
    title: "",
    description: "",
    layout: "stacked",
    statStyle: "plain",
    align: "start",
    background: "none",
    stats: () => [],
    image: "",
    imageDark: "",
    imageAlt: "",
    isContent: false,
  }
)

// COMPUTED
const items = computed(() => (Array.isArray(props.stats) ? props.stats : []))
// The split layout falls back to stacked when there is no image to show
const mode = computed(() => (props.layout === "split" && !props.image ? "stacked" : props.layout))
const centered = computed(() => props.align === "center")
const sources = computed(() => {
  if (!props.image) return []
  if (!props.imageDark) return [{ src: props.image, class: "" }]
  return [
    { src: props.image, class: "dark:hidden" },
    { src: props.imageDark, class: "hidden dark:block" },
  ]
})
const classes = computed(() => {
  const tiles = props.statStyle === "tiles" ? "gap-0.5 overflow-hidden rounded-2xl" : ""
  if (mode.value === "split")
    return {
      root: "",
      container: "mx-auto grid max-w-7xl lg:grid-cols-2",
      column: "px-6 pb-24 pt-16 sm:pb-32 sm:pt-20 lg:col-start-2 lg:px-8 lg:pt-32",
      inner: "mx-auto max-w-2xl lg:me-0 lg:max-w-lg",
      list: [
        "mt-16 grid max-w-xl grid-cols-1 overflow-hidden first:mt-0 sm:mt-20 sm:grid-cols-2 xl:mt-16",
        tiles || "gap-8",
      ],
    }
  return {
    root: "py-24 sm:py-32",
    container: "mx-auto max-w-7xl px-6 lg:px-8",
    column: "",
    inner: "mx-auto max-w-2xl lg:mx-0 lg:max-w-none",
    list:
      mode.value === "side"
        ? ["flex flex-col overflow-hidden lg:w-64 xl:w-80", tiles || "gap-8"]
        : props.statStyle === "cards"
          ? "mt-16 flex flex-col gap-8 first:mt-0 sm:mt-20 lg:flex-row lg:items-end"
          : [
              "mt-16 grid grid-cols-1 overflow-hidden first:mt-0 sm:mt-20 sm:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col",
              tiles || "gap-x-8 gap-y-10 sm:gap-y-16",
            ],
  }
})
</script>

<template>
  <div class="relative isolate overflow-hidden" :class="classes.root">
    <template v-if="mode === 'split'">
      <img
        v-for="source in sources"
        :key="source.src"
        :src="source.src"
        :alt="imageAlt"
        class="h-56 w-full bg-gray-50 object-cover lg:absolute lg:inset-y-0 lg:start-0 lg:h-full lg:w-1/2 dark:bg-gray-800"
        :class="source.class"
      />
    </template>
    <template v-else>
      <img
        v-for="source in sources"
        :key="source.src"
        :src="source.src"
        alt=""
        class="absolute inset-0 -z-10 size-full object-cover opacity-10 dark:opacity-25"
        :class="source.class"
      />
    </template>
    <sections-decorations-blobs v-if="background === 'blobs'" />
    <sections-decorations-grid v-else-if="background === 'grid'" />
    <sections-decorations-skew v-else-if="background === 'skew'" />

    <div :class="classes.container">
      <div :class="classes.column">
        <div :class="classes.inner">
          <div
            v-if="isContent ? $slots.eyebrow || $slots.title : eyebrow || title"
            :class="{ 'text-center': centered }"
          >
            <p
              v-if="isContent ? $slots.eyebrow : eyebrow"
              class="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400"
            >
              <slot v-if="isContent" name="eyebrow" />
              <template v-else>{{ eyebrow }}</template>
            </p>
            <h2
              v-if="isContent ? $slots.title : title"
              class="mt-2 max-w-2xl text-4xl font-semibold tracking-tight text-gray-900 first:mt-0 sm:text-5xl dark:text-white"
              :class="centered ? 'mx-auto text-balance' : 'text-pretty'"
            >
              <slot v-if="isContent" name="title" />
              <template v-else>{{ title }}</template>
            </h2>
          </div>

          <div
            v-if="(isContent ? $slots.default : description) || $slots.links || mode === 'side'"
            class="mt-6 first:mt-0"
            :class="{ 'flex flex-col gap-x-8 gap-y-20 lg:flex-row': mode === 'side' }"
          >
            <div
              v-if="(isContent ? $slots.default : description) || $slots.links"
              :class="
                mode === 'side'
                  ? 'lg:w-full lg:max-w-2xl lg:flex-auto'
                  : ['max-w-2xl', { 'mx-auto text-center': centered }]
              "
            >
              <div
                v-if="isContent ? $slots.default : description"
                class="space-y-6 text-lg/8 text-gray-600 dark:text-gray-300"
              >
                <slot v-if="isContent" />
                <p v-else>{{ description }}</p>
              </div>
              <div
                v-if="$slots.links"
                class="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-gray-900 first:mt-0 dark:text-white"
                :class="{ 'justify-center': centered && mode !== 'side' }"
              >
                <slot name="links" />
              </div>
            </div>
            <div v-if="mode === 'side' && items.length" class="lg:flex lg:flex-auto lg:justify-center">
              <dl :class="classes.list">
                <sections-stats-item
                  v-for="(stat, i) in items"
                  :key="i"
                  :stat="stat"
                  :stat-style="statStyle"
                  :index="i"
                  :centered="centered"
                />
              </dl>
            </div>
          </div>

          <dl v-if="mode !== 'side' && items.length" :class="classes.list">
            <sections-stats-item
              v-for="(stat, i) in items"
              :key="i"
              :stat="stat"
              :stat-style="statStyle"
              :index="i"
              :centered="centered"
              :stagger="mode === 'stacked'"
            />
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
