<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    description?: string
    layout?: "cards" | "joined" | "divided" | "wide"
    highlight?: "ring" | "dark" | "none"
    background?: "none" | "blobs" | "band"
    headingAlign?: "center" | "start"
    isContent?: boolean
  }>(),
  {
    eyebrow: "",
    title: "",
    description: "",
    layout: "cards",
    highlight: "ring",
    background: "none",
    headingAlign: "center",
    isContent: false,
  }
)

// DATA
const columns = "lg:mx-0 lg:max-w-none lg:auto-cols-fr lg:grid-flow-col"
const grids = {
  cards: `mx-auto grid max-w-md grid-cols-1 gap-8 ${columns}`,
  joined: `mx-auto grid max-w-md grid-cols-1 gap-y-8 ${columns}`,
  divided: `mx-auto grid max-w-sm grid-cols-1 gap-y-16 divide-y divide-gray-100 ${columns} lg:divide-x lg:divide-y-0 lg:rtl:divide-x-reverse dark:divide-white/10`,
  wide: "mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none",
}
provide("pricing", {
  layout: toRef(props, "layout"),
  highlight: toRef(props, "highlight"),
  background: toRef(props, "background"),
})

// METHODS
const slots = useSlots()
const hasHeading = () =>
  props.isContent
    ? !!(slots.eyebrow || slots.title || slots.description)
    : !!(props.eyebrow || props.title || props.description)

// COMPUTED
const centered = computed(() => props.headingAlign === "center")
const band = computed(() => props.background === "band")
const grid = computed(() => [
  grids[props.layout] ?? grids.cards,
  // Divided tiers have no card of their own, so they need a surface where the band covers them
  { "rounded-3xl bg-white p-8 shadow-xl lg:p-10 dark:bg-gray-800": band.value && props.layout === "divided" },
])
const tone = computed(() =>
  band.value
    ? { eyebrow: "text-indigo-400", title: "text-white", description: "text-gray-400" }
    : {
        eyebrow: "text-indigo-600 dark:text-indigo-400",
        title: "text-gray-900 dark:text-white",
        description: "text-gray-600 dark:text-gray-400",
      }
)
</script>

<template>
  <div class="relative isolate overflow-hidden" :class="band ? 'pb-24 sm:pb-32' : 'py-24 sm:py-32'">
    <sections-decorations-blobs v-if="background === 'blobs'" />

    <!-- The band runs 12rem past the heading so the tiers overlap it like a cover -->
    <div
      v-if="band || hasHeading()"
      :class="{
        'relative isolate overflow-hidden bg-gray-900 pb-64 pt-24 sm:pt-32 dark:bg-gray-800/25': band,
      }"
    >
      <sections-decorations-glow v-if="band" class="left-1/2 top-0 -translate-x-1/2" />
      <div v-if="hasHeading()" class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="max-w-4xl" :class="{ 'mx-auto text-center': centered }">
          <p
            v-if="isContent ? $slots.eyebrow : eyebrow"
            class="text-base/7 font-semibold"
            :class="tone.eyebrow"
          >
            <slot v-if="isContent" name="eyebrow" />
            <template v-else>{{ eyebrow }}</template>
          </p>
          <h2
            v-if="isContent ? $slots.title : title"
            class="mt-2 text-5xl font-semibold tracking-tight first:mt-0 sm:text-6xl"
            :class="[tone.title, centered ? 'text-balance' : 'text-pretty']"
          >
            <slot v-if="isContent" name="title" />
            <template v-else>{{ title }}</template>
          </h2>
          <p
            v-if="isContent ? $slots.description : description"
            class="mt-6 max-w-2xl text-pretty text-lg font-medium first:mt-0 sm:text-xl/8"
            :class="[tone.description, { 'mx-auto': centered }]"
          >
            <slot v-if="isContent" name="description" />
            <template v-else>{{ description }}</template>
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="$slots.default"
      class="relative mx-auto max-w-7xl px-6 lg:px-8"
      :class="band ? '-mt-48' : { 'mt-16 sm:mt-20': hasHeading() }"
    >
      <div class="isolate" :class="grid">
        <slot />
      </div>
    </div>
  </div>
</template>
