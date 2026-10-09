<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    layout?: "grid" | "split" | "tiles"
    align?: "center" | "start"
    background?: "none" | "blobs" | "grid" | "skew"
    logos?: { image: string; imageDark: string; alt: string; link: string }[]
    isContent?: boolean
  }>(),
  {
    title: "",
    description: "",
    layout: "grid",
    align: "center",
    background: "none",
    logos: () => [],
    isContent: false,
  }
)

// METHODS
const slots = useSlots()
const hasHeading = () =>
  props.isContent ? !!(slots.title || slots.default) : !!(props.title || props.description)

// COMPUTED
const items = computed(() =>
  (Array.isArray(props.logos) ? props.logos : []).filter((logo) => logo?.image || logo?.imageDark)
)
const start = computed(() => props.align === "start")
const split = computed(() => props.layout === "split")
</script>

<template>
  <div class="relative isolate overflow-hidden py-24 sm:py-32">
    <sections-decorations-blobs v-if="background === 'blobs'" />
    <sections-decorations-grid v-else-if="background === 'grid'" />
    <sections-decorations-skew v-else-if="background === 'skew'" />

    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div :class="{ 'grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2': split }">
        <!-- heading: large in the split layout, a small line above the logos otherwise -->
        <div
          v-if="hasHeading() || (split && $slots.links)"
          :class="[split ? 'mx-auto w-full max-w-xl lg:mx-0' : 'mb-10', { 'text-center': !start }]"
        >
          <h2
            v-if="isContent ? $slots.title : title"
            class="font-semibold text-gray-900 dark:text-white"
            :class="split ? 'text-pretty text-4xl tracking-tight sm:text-5xl' : 'text-lg/8'"
          >
            <slot v-if="isContent" name="title" />
            <template v-else>{{ title }}</template>
          </h2>
          <div
            v-if="isContent ? $slots.default : description"
            class="text-gray-600 first:mt-0 dark:text-gray-300"
            :class="split ? 'mt-6 text-lg/8' : 'mt-2 text-base/7'"
          >
            <slot v-if="isContent" />
            <p v-else>{{ description }}</p>
          </div>
          <div
            v-if="split && $slots.links"
            class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 first:mt-0"
            :class="{ 'justify-center': !start }"
          >
            <slot name="links" />
          </div>
        </div>

        <!-- logos -->
        <div
          v-if="items.length && layout === 'tiles'"
          class="grid grid-cols-2 gap-0.5 overflow-hidden rounded-2xl md:grid-cols-3"
        >
          <div v-for="(logo, i) in items" :key="i" class="bg-gray-400/5 p-6 sm:p-10 dark:bg-white/5">
            <sections-logo-cloud-logo :logo="logo" :start="start" />
          </div>
        </div>
        <div
          v-else-if="items.length && split"
          class="mx-auto grid w-full max-w-xl grid-cols-2 items-center gap-x-8 gap-y-12 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:ps-8"
        >
          <sections-logo-cloud-logo v-for="(logo, i) in items" :key="i" :logo="logo" :start="start" />
        </div>
        <!-- Fixed-width logos wrap freely, so any number of logos lines up and the last row centers -->
        <div
          v-else-if="items.length"
          class="flex flex-wrap items-center gap-x-8 gap-y-10 sm:gap-x-10"
          :class="start ? 'justify-start' : 'justify-center'"
        >
          <sections-logo-cloud-logo
            v-for="(logo, i) in items"
            :key="i"
            :logo="logo"
            :start="start"
            class="w-28 sm:w-40"
          />
        </div>
      </div>

      <div
        v-if="!split && $slots.links"
        class="mt-16 flex flex-wrap items-center gap-x-6 gap-y-4"
        :class="start ? 'justify-start' : 'justify-center'"
      >
        <slot name="links" />
      </div>
    </div>
  </div>
</template>
