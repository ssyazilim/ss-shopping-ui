<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    description?: string
    layout?: "pillars" | "zigzag" | "two-three"
    imagePosition?: "top" | "bottom"
    headingAlign?: "start" | "center"
    cards?: {
      eyebrow: string
      title: string
      description: string
      image: string
      imageDark: string
      imageAlt: string
    }[]
    isContent?: boolean
  }>(),
  {
    eyebrow: "",
    title: "",
    description: "",
    layout: "pillars",
    imagePosition: "top",
    headingAlign: "start",
    cards: () => [],
    isContent: false,
  }
)

// DATA
const layouts = {
  pillars: {
    grid: "lg:grid-cols-3 lg:grid-rows-2",
    cells: [
      { span: "lg:row-span-2", round: "lg:rounded-s-[2rem]" },
      { span: "", round: "" },
      { span: "lg:col-start-2 lg:row-start-2", round: "" },
      { span: "lg:row-span-2", round: "lg:rounded-e-[2rem]" },
    ],
  },
  zigzag: {
    grid: "lg:grid-cols-6 lg:grid-rows-2",
    cells: [
      { span: "lg:col-span-4", round: "lg:rounded-ss-[2rem]" },
      { span: "lg:col-span-2", round: "lg:rounded-se-[2rem]" },
      { span: "lg:col-span-2", round: "lg:rounded-es-[2rem]" },
      { span: "lg:col-span-4", round: "lg:rounded-ee-[2rem]" },
    ],
  },
  "two-three": {
    grid: "lg:grid-cols-6 lg:grid-rows-2",
    cells: [
      { span: "lg:col-span-3", round: "lg:rounded-ss-[2rem]" },
      { span: "lg:col-span-3", round: "lg:rounded-se-[2rem]" },
      { span: "lg:col-span-2", round: "lg:rounded-es-[2rem]" },
      { span: "lg:col-span-2", round: "" },
      { span: "lg:col-span-2", round: "lg:rounded-ee-[2rem]" },
    ],
  },
}

// COMPUTED
const centered = computed(() => props.headingAlign === "center")
const grid = computed(() => layouts[props.layout] ?? layouts.pillars)
// Each layout has a fixed number of cells; extra cards are not shown
const items = computed(() =>
  (Array.isArray(props.cards) ? props.cards : []).slice(0, grid.value.cells.length).map((card, i, list) => ({
    ...card,
    span: grid.value.cells[i]?.span,
    corners: [
      grid.value.cells[i]?.round,
      { "max-lg:rounded-t-[2rem]": i === 0, "max-lg:rounded-b-[2rem]": i === list.length - 1 },
    ],
    sources: !card?.image
      ? []
      : card.imageDark
        ? [
            { src: card.image, class: "dark:hidden" },
            { src: card.imageDark, class: "hidden dark:block" },
          ]
        : [{ src: card.image, class: "" }],
  }))
)
</script>

<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
      <div
        v-if="isContent ? $slots.eyebrow || $slots.title || $slots.default : eyebrow || title || description"
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
          class="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-gray-950 first:mt-0 sm:text-5xl dark:text-white"
          :class="centered ? 'mx-auto text-balance' : 'text-pretty'"
        >
          <slot v-if="isContent" name="title" />
          <template v-else>{{ title }}</template>
        </h2>
        <p
          v-if="isContent ? $slots.default : description"
          class="mt-6 max-w-2xl text-lg/8 text-gray-600 first:mt-0 dark:text-gray-300"
          :class="{ 'mx-auto': centered }"
        >
          <slot v-if="isContent" />
          <template v-else>{{ description }}</template>
        </p>
      </div>

      <div v-if="items.length" class="mt-10 grid grid-cols-1 gap-4 first:mt-0 sm:mt-16" :class="grid.grid">
        <div v-for="(card, i) in items" :key="i" class="flex p-px" :class="card.span">
          <div
            class="flex w-full flex-col overflow-hidden rounded-lg bg-white shadow outline outline-1 outline-black/5 dark:bg-gray-800 dark:shadow-none dark:outline-white/15"
            :class="card.corners"
          >
            <div
              v-if="card.sources.length"
              class="relative min-h-80 grow"
              :class="{ 'order-last': imagePosition === 'bottom' }"
            >
              <img
                v-for="source in card.sources"
                :key="source.src"
                :src="source.src"
                :alt="card.imageAlt"
                class="absolute inset-0 size-full object-cover"
                :class="source.class"
              />
            </div>
            <div class="p-8 sm:p-10">
              <p v-if="card.eyebrow" class="text-sm/4 font-semibold text-indigo-600 dark:text-indigo-400">
                {{ card.eyebrow }}
              </p>
              <h3
                v-if="card.title"
                class="mt-2 text-lg font-medium tracking-tight text-gray-950 first:mt-0 dark:text-white"
              >
                {{ card.title }}
              </h3>
              <p
                v-if="card.description"
                class="mt-2 max-w-lg text-sm/6 text-gray-600 first:mt-0 dark:text-gray-400"
              >
                {{ card.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
