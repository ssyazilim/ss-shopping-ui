<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    description?: string
    layout?: "centered" | "split" | "half" | "angled" | "offset" | "tiles"
    background?: "blobs" | "grid" | "skew" | "none"
    images?: { src: string; darkSrc: string; alt: string }[]
    isContent?: boolean
  }>(),
  {
    eyebrow: "",
    title: "",
    description: "",
    layout: "centered",
    background: "blobs",
    images: () => [],
    isContent: false,
  }
)

// DATA
const photoLayout = {
  container: "mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8",
  column: "px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-48 lg:pt-40 xl:col-span-6",
  text: "mx-auto max-w-lg lg:mx-0",
  heading: "",
  body: "mt-8",
}
const layouts = {
  split: {
    container: "mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40",
    column: "mx-auto max-w-2xl shrink-0 lg:mx-0 lg:pt-8",
    text: "",
    heading: "",
    body: "mt-8",
  },
  half: photoLayout,
  angled: photoLayout,
  offset: {
    container: "mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8",
    column: "",
    text: "mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8",
    heading: "max-w-2xl lg:col-span-2 xl:col-auto",
    body: "mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1",
  },
  tiles: {
    container: "mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32",
    column: "mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center",
    text: "relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl",
    heading: "",
    body: "mt-8",
  },
}

// COMPUTED
const centered = computed(() => !(props.layout in layouts))
const items = computed(() => (Array.isArray(props.images) ? props.images : []))
const image = computed(() => items.value.find((item) => item?.src))
const tiles = computed(() => items.value.slice(0, 5))
const classes = computed(() => {
  if (props.layout in layouts) return layouts[props.layout as keyof typeof layouts]
  return {
    container: [
      "mx-auto max-w-7xl px-6 lg:px-8",
      image.value ? "py-24 sm:py-32 lg:pb-40" : "py-32 sm:py-48 lg:py-56",
    ],
    column: "",
    text: "mx-auto max-w-2xl text-center",
    heading: "",
    body: "mt-8",
  }
})
</script>

<template>
  <div class="relative isolate overflow-hidden">
    <sections-decorations-blobs v-if="background === 'blobs'" />
    <sections-decorations-grid v-else-if="background === 'grid'" />
    <sections-decorations-skew v-else-if="background === 'skew'" />

    <div :class="classes.container">
      <div :class="classes.column">
        <div :class="classes.text">
          <div :class="classes.heading">
            <div
              v-if="isContent ? $slots.eyebrow : eyebrow"
              class="flex flex-wrap items-center gap-2 text-sm/6 font-semibold text-indigo-600 dark:text-indigo-400"
              :class="centered ? 'mb-8 justify-center' : 'mb-10'"
            >
              <slot v-if="isContent" name="eyebrow" />
              <template v-else>{{ eyebrow }}</template>
            </div>
            <h1
              v-if="isContent ? $slots.title : title"
              class="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl dark:text-white"
              :class="centered || layout === 'offset' ? 'text-balance' : 'text-pretty'"
            >
              <slot v-if="isContent" name="title" />
              <template v-else>{{ title }}</template>
            </h1>
          </div>
          <div v-if="(isContent ? $slots.default : description) || $slots.links" :class="classes.body">
            <p
              v-if="isContent ? $slots.default : description"
              class="text-pretty text-lg font-medium text-gray-500 sm:text-xl/8 dark:text-gray-400"
            >
              <slot v-if="isContent" />
              <template v-else>{{ description }}</template>
            </p>
            <div
              v-if="$slots.links"
              class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 text-gray-900 first:mt-0 dark:text-white"
              :class="{ 'justify-center': centered }"
            >
              <slot name="links" />
            </div>
          </div>

          <div
            v-if="layout === 'offset' && image"
            class="mt-10 max-w-lg sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              class="aspect-[6/5] w-full rounded-2xl object-cover outline outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10"
              :class="{ 'dark:hidden': image.darkSrc }"
            />
            <img
              v-if="image.darkSrc"
              :src="image.darkSrc"
              :alt="image.alt"
              class="hidden aspect-[6/5] w-full rounded-2xl object-cover outline outline-1 -outline-offset-1 outline-white/10 dark:block"
            />
          </div>
        </div>

        <sections-media-tiles v-if="layout === 'tiles' && tiles.some((item) => item?.src)" :images="tiles" />
      </div>

      <template v-if="image">
        <div v-if="centered" class="mt-16 flow-root sm:mt-24">
          <sections-media-screenshot :src="image.src" :dark-src="image.darkSrc" :alt="image.alt" />
        </div>
        <div
          v-else-if="layout === 'split'"
          class="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:me-0 lg:ms-10 lg:mt-0 lg:max-w-none lg:flex-none xl:ms-32"
        >
          <div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <sections-media-screenshot :src="image.src" :dark-src="image.darkSrc" :alt="image.alt" wide />
          </div>
        </div>
        <div
          v-else-if="layout === 'half' || layout === 'angled'"
          class="relative lg:col-span-5 lg:-me-8 xl:absolute xl:inset-y-0 xl:end-0 xl:start-1/2 xl:me-0"
          :class="{
            'lg:[clip-path:polygon(20%_0,100%_0,100%_100%,0_100%)] lg:rtl:[clip-path:polygon(0_0,80%_0,100%_100%,0_100%)]':
              layout === 'angled',
          }"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full dark:bg-gray-800"
            :class="{ 'dark:hidden': image.darkSrc }"
          />
          <img
            v-if="image.darkSrc"
            :src="image.darkSrc"
            :alt="image.alt"
            class="hidden aspect-[3/2] w-full bg-gray-800 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full dark:block"
          />
        </div>
      </template>
    </div>
  </div>
</template>
