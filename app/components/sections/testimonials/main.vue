<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    description?: string
    layout?: "single" | "portrait" | "pair" | "masonry"
    align?: "center" | "start"
    background?: "none" | "blobs" | "grid" | "skew"
    highlightFirst?: boolean
    testimonials?: {
      quote: string
      name: string
      role: string
      avatar: string
      logo: string
      rating: string
    }[]
    image?: string
    isContent?: boolean
  }>(),
  {
    eyebrow: "",
    title: "",
    description: "",
    layout: "single",
    align: "center",
    background: "none",
    highlightFirst: false,
    testimonials: () => [],
    image: "",
    isContent: false,
  }
)

// METHODS
const slots = useSlots()
const hasHeading = () =>
  props.isContent
    ? !!(slots.eyebrow || slots.title || slots.default)
    : !!(props.eyebrow || props.title || props.description)

// COMPUTED
const centered = computed(() => props.align === "center")
const items = computed(() => (Array.isArray(props.testimonials) ? props.testimonials.filter(Boolean) : []))
// Single-testimonial layouts show the first item, pair the first two, masonry all of them
const first = computed(() => items.value[0])
const pair = computed(() => items.value.slice(0, 2))
const featured = computed(() => (props.highlightFirst ? items.value[0] : undefined))
const rest = computed(() => (props.highlightFirst ? items.value.slice(1) : items.value))
</script>

<template>
  <div class="relative isolate overflow-hidden py-24 sm:py-32">
    <img
      v-if="image"
      :src="image"
      alt=""
      class="absolute inset-0 -z-10 size-full object-cover opacity-10 dark:opacity-25"
    />
    <sections-decorations-blobs v-if="background === 'blobs'" />
    <sections-decorations-grid v-else-if="background === 'grid'" />
    <sections-decorations-skew v-else-if="background === 'skew'" />

    <!-- heading -->
    <div v-if="hasHeading()" class="mx-auto mb-16 max-w-7xl px-6 sm:mb-20 lg:px-8">
      <div class="mx-auto max-w-2xl" :class="centered ? 'text-center' : 'lg:mx-0'">
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
          class="mt-6 text-lg/8 text-gray-600 first:mt-0 dark:text-gray-300"
        >
          <slot v-if="isContent" />
          <template v-else>{{ description }}</template>
        </p>
      </div>
    </div>

    <!-- single -->
    <div v-if="layout === 'single' && first" class="px-6 lg:px-8">
      <figure class="mx-auto max-w-2xl" :class="{ 'text-center lg:max-w-4xl': centered }">
        <img
          v-if="first.logo"
          :src="first.logo"
          alt=""
          class="h-12 w-auto"
          :class="{ 'mx-auto': centered }"
        />
        <sections-testimonials-rating
          :rating="first.rating"
          class="mt-10 first:mt-0"
          :class="{ 'justify-center': centered }"
        />
        <blockquote
          class="mt-10 text-xl/8 font-semibold tracking-tight text-gray-900 first:mt-0 sm:text-2xl/9 dark:text-white"
        >
          <p>{{ first.quote }}</p>
        </blockquote>
        <figcaption v-if="centered" class="mt-10">
          <img v-if="first.avatar" :src="first.avatar" alt="" class="mx-auto size-10 rounded-full" />
          <div class="mt-4 flex items-center justify-center gap-x-3 text-base first:mt-0">
            <div class="font-semibold text-gray-900 dark:text-white">{{ first.name }}</div>
            <svg
              v-if="first.name && first.role"
              viewBox="0 0 2 2"
              width="3"
              height="3"
              aria-hidden="true"
              class="fill-gray-900 dark:fill-white"
            >
              <circle cx="1" cy="1" r="1" />
            </svg>
            <div class="text-gray-600 dark:text-gray-400">{{ first.role }}</div>
          </div>
        </figcaption>
        <figcaption v-else class="mt-10 flex items-center gap-x-6">
          <img
            v-if="first.avatar"
            :src="first.avatar"
            alt=""
            class="size-12 rounded-full bg-gray-50 dark:bg-gray-800"
          />
          <div class="text-sm/6">
            <div class="font-semibold text-gray-900 dark:text-white">{{ first.name }}</div>
            <div class="mt-0.5 text-gray-600 dark:text-gray-400">{{ first.role }}</div>
          </div>
        </figcaption>
      </figure>
    </div>

    <!-- portrait -->
    <div v-else-if="layout === 'portrait' && first" class="px-6 lg:px-8">
      <figure
        class="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-6 gap-y-8 lg:max-w-4xl lg:gap-x-10"
      >
        <img v-if="first.logo" :src="first.logo" alt="" class="h-12 w-auto lg:col-start-1 lg:row-start-1" />
        <div class="relative col-span-2 lg:col-start-1 lg:row-start-2">
          <sections-decorations-quote class="-top-12 start-0 stroke-gray-900/10 dark:stroke-white/20" />
          <sections-testimonials-rating :rating="first.rating" class="mb-6" />
          <blockquote class="text-xl/8 font-semibold text-gray-900 sm:text-2xl/9 dark:text-white">
            <p>{{ first.quote }}</p>
          </blockquote>
        </div>
        <div v-if="first.avatar" class="col-end-1 w-16 lg:row-span-4 lg:w-72">
          <img
            :src="first.avatar"
            alt=""
            class="rounded-xl bg-indigo-50 lg:rounded-3xl dark:bg-indigo-900/20"
          />
        </div>
        <figcaption class="text-base lg:col-start-1 lg:row-start-3">
          <div class="font-semibold text-gray-900 dark:text-white">{{ first.name }}</div>
          <div class="mt-1 text-gray-500 dark:text-gray-400">{{ first.role }}</div>
        </figcaption>
      </figure>
    </div>

    <!-- pair -->
    <div v-else-if="layout === 'pair' && pair.length" class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <figure
          v-for="(testimonial, i) in pair"
          :key="i"
          class="flex flex-col"
          :class="
            i === 0
              ? 'pb-10 sm:pb-16 lg:pb-0 lg:pe-8 xl:pe-20'
              : 'border-t border-gray-900/10 pt-10 sm:pt-16 lg:border-s lg:border-t-0 lg:ps-8 lg:pt-0 xl:ps-20 dark:border-white/10'
          "
        >
          <img v-if="testimonial.logo" :src="testimonial.logo" alt="" class="mb-10 h-12 self-start" />
          <sections-testimonials-rating :rating="testimonial.rating" class="mb-6" />
          <div class="flex flex-auto flex-col justify-between">
            <blockquote class="text-lg/8 text-gray-900 dark:text-gray-100">
              <p>{{ testimonial.quote }}</p>
            </blockquote>
            <figcaption class="mt-10 flex items-center gap-x-6">
              <img
                v-if="testimonial.avatar"
                :src="testimonial.avatar"
                alt=""
                class="size-14 rounded-full bg-gray-50 dark:bg-gray-800"
              />
              <div class="text-base">
                <div class="font-semibold text-gray-900 dark:text-white">{{ testimonial.name }}</div>
                <div class="mt-1 text-gray-500 dark:text-gray-400">{{ testimonial.role }}</div>
              </div>
            </figcaption>
          </div>
        </figure>
      </div>
    </div>

    <!-- masonry -->
    <div v-else-if="layout === 'masonry' && items.length" class="mx-auto max-w-7xl px-6 lg:px-8">
      <figure
        v-if="featured"
        class="mx-auto max-w-2xl rounded-2xl bg-white text-sm/6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-4xl dark:bg-gray-800/75 dark:shadow-none dark:ring-white/10"
      >
        <div class="p-6 sm:p-12">
          <sections-testimonials-rating :rating="featured.rating" class="mb-6" />
          <blockquote class="text-lg font-semibold tracking-tight text-gray-900 sm:text-xl/8 dark:text-white">
            <p>{{ featured.quote }}</p>
          </blockquote>
        </div>
        <figcaption
          class="flex flex-wrap items-center gap-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap dark:border-white/10"
        >
          <img
            v-if="featured.avatar"
            :src="featured.avatar"
            alt=""
            class="size-10 flex-none rounded-full bg-gray-50 dark:bg-gray-700"
          />
          <div class="flex-auto">
            <div class="font-semibold text-gray-900 dark:text-white">{{ featured.name }}</div>
            <div class="text-gray-600 dark:text-gray-400">{{ featured.role }}</div>
          </div>
          <img v-if="featured.logo" :src="featured.logo" alt="" class="h-10 w-auto flex-none" />
        </figcaption>
      </figure>

      <div
        v-if="rest.length"
        class="mx-auto flow-root max-w-2xl lg:mx-0 lg:max-w-none"
        :class="{ 'mt-8': featured }"
      >
        <div class="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
          <div v-for="(testimonial, i) in rest" :key="i" class="pt-8 sm:inline-block sm:w-full sm:px-4">
            <figure class="rounded-2xl bg-gray-50 p-8 text-sm/6 dark:bg-white/[0.025]">
              <sections-testimonials-rating :rating="testimonial.rating" class="mb-4" />
              <blockquote class="text-gray-900 dark:text-gray-100">
                <p>{{ testimonial.quote }}</p>
              </blockquote>
              <figcaption class="mt-6 flex items-center gap-x-4">
                <img
                  v-if="testimonial.avatar"
                  :src="testimonial.avatar"
                  alt=""
                  class="size-10 rounded-full bg-gray-50 dark:bg-gray-800"
                />
                <div class="flex-auto">
                  <div class="font-semibold text-gray-900 dark:text-white">{{ testimonial.name }}</div>
                  <div class="text-gray-600 dark:text-gray-400">{{ testimonial.role }}</div>
                </div>
                <img v-if="testimonial.logo" :src="testimonial.logo" alt="" class="h-8 w-auto flex-none" />
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
