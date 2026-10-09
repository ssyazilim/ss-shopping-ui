<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    description?: string
    align?: "start" | "center"
    alternate?: boolean
    products?: { image: string; alt: string; name: string; description: string }[]
    isContent?: boolean
  }>(),
  {
    eyebrow: "",
    title: "",
    description: "",
    align: "start",
    alternate: false,
    products: () => [],
    isContent: false,
  }
)

// METHODS
const slots = useSlots()
const hasHeading = () =>
  props.isContent
    ? !!(slots.eyebrow || slots.title || slots.default)
    : !!(props.eyebrow || props.title || props.description)
// With alternate, every second row puts the photo on the start side
const flipped = (index: number) => props.alternate && index % 2 === 1

// COMPUTED
const items = computed(() =>
  (Array.isArray(props.products) ? props.products : []).filter(
    (product) => product?.image || product?.name || product?.description
  )
)
const center = computed(() => props.align === "center")
</script>

<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div v-if="hasHeading()" class="max-w-3xl" :class="{ 'mx-auto text-center': center }">
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

      <div v-if="items.length" class="space-y-16" :class="{ 'mt-16': hasHeading() }">
        <!-- The text comes first for screen readers; on phones the photo is shown above it -->
        <div
          v-for="(product, i) in items"
          :key="i"
          class="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"
        >
          <div
            v-if="product.name || product.description"
            class="lg:col-span-5 lg:row-start-1 xl:col-span-4"
            :class="[
              flipped(i) ? 'lg:col-start-8 xl:col-start-9' : 'lg:col-start-1',
              { 'mt-6 lg:mt-0': product.image },
            ]"
          >
            <h3 v-if="product.name" class="text-lg/8 font-semibold text-gray-900 dark:text-white">
              {{ product.name }}
            </h3>
            <p
              v-if="product.description"
              class="mt-2 text-base/7 text-gray-600 first:mt-0 dark:text-gray-400"
            >
              {{ product.description }}
            </p>
          </div>
          <div
            v-if="product.image"
            class="flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8"
            :class="flipped(i) ? 'lg:col-start-1' : 'lg:col-start-6 xl:col-start-5'"
          >
            <img
              :src="product.image"
              :alt="product.alt"
              class="aspect-[5/2] w-full rounded-lg bg-gray-100 object-cover dark:bg-gray-800"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
