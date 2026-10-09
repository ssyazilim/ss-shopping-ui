<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    description?: string
    layout?: "stacked" | "side"
    align?: "start" | "center"
    personStyle?: "inline" | "avatar" | "circle" | "photo" | "row"
    columns?: "1" | "2" | "3" | "4" | "6"
    cards?: boolean
    background?: "none" | "blobs" | "grid" | "skew"
    people?: {
      name: string
      role: string
      image: string
      bio: string
      location: string
      icon: string
      link: string
    }[]
    isContent?: boolean
  }>(),
  {
    eyebrow: "",
    title: "",
    description: "",
    layout: "stacked",
    align: "start",
    personStyle: "photo",
    columns: "3",
    cards: false,
    background: "none",
    people: () => [],
    isContent: false,
  }
)

// DATA
const grid = {
  "1": "grid-cols-1",
  "2": "grid-cols-1 sm:grid-cols-2",
  "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  "6": "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
}

// METHODS
const slots = useSlots()
const hasHeading = () =>
  props.isContent
    ? !!(slots.eyebrow || slots.title || slots.default)
    : !!(props.eyebrow || props.title || props.description)

// COMPUTED
const items = computed(() => (Array.isArray(props.people) ? props.people.filter(Boolean) : []))
const side = computed(() => props.layout === "side")
const centered = computed(() => props.align === "center")
// A single column of rows is separated by lines instead of gaps
const divided = computed(() => props.personStyle === "row" && props.columns === "1" && !props.cards)
const list = computed(() => [
  side.value ? "xl:col-span-2" : "mt-20 first:mt-0",
  "mx-auto max-w-2xl lg:mx-0 lg:max-w-none",
  divided.value
    ? "divide-y divide-gray-200 dark:divide-gray-800"
    : ["grid", grid[props.columns] ?? grid["3"], props.cards ? "gap-6 lg:gap-8" : "gap-x-8 gap-y-16"],
])
</script>

<template>
  <div class="relative isolate overflow-hidden py-24 sm:py-32">
    <sections-decorations-blobs v-if="background === 'blobs'" />
    <sections-decorations-grid v-else-if="background === 'grid'" />
    <sections-decorations-skew v-else-if="background === 'skew'" />

    <div class="mx-auto max-w-7xl px-6 lg:px-8" :class="{ 'grid gap-20 xl:grid-cols-3': side }">
      <div
        v-if="hasHeading()"
        class="mx-auto max-w-2xl"
        :class="[centered ? 'text-center' : 'lg:mx-0', { 'xl:max-w-xl': side }]"
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
          class="mt-2 text-4xl font-semibold tracking-tight text-gray-900 first:mt-0 sm:text-5xl dark:text-white"
          :class="centered ? 'text-balance' : 'text-pretty'"
        >
          <slot v-if="isContent" name="title" />
          <template v-else>{{ title }}</template>
        </h2>
        <p
          v-if="isContent ? $slots.default : description"
          class="mt-6 text-lg/8 text-gray-600 first:mt-0 dark:text-gray-400"
        >
          <slot v-if="isContent" />
          <template v-else>{{ description }}</template>
        </p>
      </div>

      <ul v-if="items.length" role="list" :class="list">
        <sections-team-person
          v-for="(person, i) in items"
          :key="i"
          :person="person"
          :person-style="personStyle"
          :wide="columns === '1'"
          :card="cards"
          :class="{ 'py-12 first:pt-0 last:pb-0': divided }"
        />
      </ul>
    </div>
  </div>
</template>
