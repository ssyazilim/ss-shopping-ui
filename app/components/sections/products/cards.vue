<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    description?: string
    columns?: "2" | "3" | "4"
    align?: "start" | "center"
    ratio?: "square" | "wide"
    products?: { image: string; alt: string; name: string; description: string; to: string }[]
    isContent?: boolean
  }>(),
  {
    eyebrow: "",
    title: "",
    description: "",
    columns: "3",
    align: "start",
    ratio: "square",
    products: () => [],
    isContent: false,
  }
)

// DATA
const NuxtLink = resolveComponent("NuxtLink")
const gridColumns = {
  "2": "sm:grid-cols-2",
  "3": "sm:grid-cols-2 lg:grid-cols-3",
  "4": "sm:grid-cols-2 lg:grid-cols-4",
}

// METHODS
const slots = useSlots()
const hasHeading = () =>
  props.isContent
    ? !!(slots.eyebrow || slots.title || slots.default)
    : !!(props.eyebrow || props.title || props.description)
const external = (to: string) => /^(https?:)?\/\//.test(to)

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

      <div
        v-if="items.length"
        class="grid grid-cols-1 items-start gap-x-6 gap-y-16 lg:gap-x-8"
        :class="[gridColumns[columns] ?? gridColumns['3'], { 'mt-16': hasHeading() }]"
      >
        <!-- The text comes first for screen readers, the photo is shown above it; a link makes the whole card clickable -->
        <component
          :is="product.to ? NuxtLink : 'div'"
          v-for="(product, i) in items"
          :key="i"
          :to="product.to || undefined"
          :target="product.to && external(product.to) ? '_blank' : undefined"
          class="group flex flex-col-reverse"
        >
          <div v-if="product.name || product.description" :class="{ 'mt-6': product.image }">
            <h3 v-if="product.name" class="text-base/7 font-semibold text-gray-900 dark:text-white">
              {{ product.name }}
            </h3>
            <p v-if="product.description" class="mt-2 text-sm/6 text-gray-600 first:mt-0 dark:text-gray-400">
              {{ product.description }}
            </p>
          </div>
          <img
            v-if="product.image"
            :src="product.image"
            :alt="product.alt"
            class="w-full rounded-lg bg-gray-100 object-cover dark:bg-gray-800"
            :class="[
              ratio === 'wide' ? 'aspect-[3/2]' : 'aspect-square',
              { 'group-hover:opacity-75': product.to },
            ]"
          />
        </component>
      </div>
    </div>
  </div>
</template>
