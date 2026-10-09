<script setup lang="ts">
import type { VNode } from "vue"

// PROPS
const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    description?: string
    align?: "start" | "center"
    effect?: "slide" | "coverflow" | "cards"
    arrows?: "glass" | "plain" | "none"
    dots?: "dots" | "pill" | "progress" | "none"
    // Rendered video cards, one per slide
    cards?: VNode[]
    isContent?: boolean
  }>(),
  {
    eyebrow: "",
    title: "",
    description: "",
    align: "start",
    effect: "slide",
    arrows: "glass",
    dots: "dots",
    cards: () => [],
    isContent: false,
  }
)

// METHODS
const slots = useSlots()
const hasHeading = () =>
  props.isContent
    ? !!(slots.eyebrow || slots.title || slots.description)
    : !!(props.eyebrow || props.title || props.description)

// COMPUTED
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
          v-if="isContent ? $slots.description : description"
          class="mt-6 text-lg/8 text-gray-600 first:mt-0 dark:text-gray-300"
        >
          <slot v-if="isContent" name="description" />
          <template v-else>{{ description }}</template>
        </p>
      </div>

      <!-- Tall cards: with the slide effect two side by side on phones and tablets, four on large screens -->
      <data-displays-slider
        :items="cards"
        variant="card"
        :effect="effect"
        :phone-per-view="2"
        :per-view="4"
        :gap="16"
        :arrows="arrows !== 'none'"
        :arrow-style="arrows === 'none' ? undefined : arrows"
        :dots="dots !== 'none'"
        :dot-style="dots === 'none' ? undefined : dots"
        :class="{ 'mt-16': hasHeading() }"
      >
        <template #default="{ item }">
          <component :is="item" />
        </template>
      </data-displays-slider>
    </div>
  </div>
</template>
