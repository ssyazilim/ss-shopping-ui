<script setup lang="ts">
import type { Ref } from "vue"

// PROPS
const props = withDefaults(
  defineProps<{
    name?: string
    badge?: string
    price?: string
    period?: string
    note?: string
    description?: string
    features?: string[]
    featured?: boolean
    isContent?: boolean
  }>(),
  {
    name: "",
    badge: "",
    price: "",
    period: "",
    note: "",
    description: "",
    features: () => [],
    featured: false,
    isContent: false,
  }
)

// DATA
const pricing = inject<{
  layout: Ref<"cards" | "joined" | "divided" | "wide">
  highlight: Ref<"ring" | "dark" | "none">
  background: Ref<"none" | "blobs" | "band">
}>("pricing", { layout: ref("cards"), highlight: ref("ring"), background: ref("none") })

// COMPUTED
const wide = computed(() => pricing.layout.value === "wide")
const style = computed(() => (props.featured ? pricing.highlight.value : "none"))
// In the divided layout only a highlighted tier gets a card
const card = computed(() => pricing.layout.value !== "divided" || style.value !== "none")
const tone = computed(() => {
  if (style.value === "dark")
    return {
      card: "bg-gray-900 ring-1 ring-white/10 dark:bg-gray-800/50 dark:ring-2 dark:ring-indigo-500",
      box: "bg-white/5 ring-white/10",
      name: "text-white dark:text-indigo-400",
      badge: "bg-white/10 text-white",
      text: "text-gray-300",
      price: "text-white",
    }
  return {
    card:
      style.value === "ring"
        ? "bg-white ring-2 ring-indigo-600 dark:bg-gray-800/50 dark:ring-indigo-400"
        : "bg-white ring-1 ring-gray-200 dark:bg-gray-800/50 dark:ring-white/15",
    box: "bg-gray-50 ring-gray-900/5 dark:bg-gray-900 dark:ring-white/10",
    name: style.value === "ring" ? "text-indigo-600 dark:text-indigo-400" : "text-gray-900 dark:text-white",
    badge: "bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500 dark:text-white",
    text: "text-gray-600 dark:text-gray-300",
    price: "text-gray-900 dark:text-white",
  }
})
const classes = computed(() => {
  if (wide.value)
    return {
      shell: [
        "rounded-3xl p-2 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:grid-rows-[auto_1fr]",
        tone.value.card,
        { "shadow-xl dark:shadow-none": pricing.background.value === "band" },
      ],
      header: "px-6 pt-6 sm:px-8 sm:pt-8 lg:col-start-1 lg:row-start-1",
      name: "text-3xl font-semibold tracking-tight",
      description: "mt-6 text-base/7",
      offer: [
        "mt-8 flex flex-col rounded-2xl px-8 py-10 text-center ring-1 ring-inset lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:justify-center lg:py-16",
        tone.value.box,
      ],
      price: "mt-6 justify-center first:mt-0",
      note: "text-base font-semibold",
      links: "mt-10",
      features:
        "px-6 pb-6 pt-10 sm:px-8 sm:pb-8 lg:col-start-1 lg:row-start-2 [&_ul]:grid [&_ul]:grid-cols-1 [&_ul]:gap-4 sm:[&_ul]:grid-cols-2 sm:[&_ul]:gap-6",
    }
  const shell: unknown[] = ["flex flex-col"]
  if (card.value) shell.push("rounded-3xl p-8 xl:p-10", tone.value.card)
  // Cards on the dark band need a shadow to lift off it
  if (card.value && pricing.background.value === "band") shell.push("shadow-xl dark:shadow-none")
  if (pricing.layout.value === "divided")
    shell.push(card.value ? "lg:mx-4" : "pt-16 first:pt-0 lg:px-8 lg:pt-0 xl:px-14")
  if (pricing.layout.value === "joined")
    shell.push(
      "lg:first:-me-px lg:first:rounded-e-none lg:last:-ms-px lg:last:rounded-s-none",
      props.featured
        ? "lg:z-10 lg:rounded-b-none"
        : "lg:mt-8 lg:[&:not(:first-child):not(:last-child)]:rounded-none"
    )
  return {
    shell,
    header: "",
    name: "text-lg/8 font-semibold",
    description: "mt-4 text-sm/6",
    offer: "mt-6 flex flex-col",
    price: "",
    note: "order-1 mt-3 text-sm/6",
    links: "order-2 mt-6",
    features: "mt-8 xl:mt-10 [&_ul]:space-y-3",
  }
})
</script>

<template>
  <div :class="classes.shell">
    <div :class="classes.header">
      <div class="flex items-center justify-between gap-x-4">
        <h3 v-if="isContent ? $slots.name : name" :class="[classes.name, tone.name]">
          <slot v-if="isContent" name="name" />
          <template v-else>{{ name }}</template>
        </h3>
        <p
          v-if="isContent ? $slots.badge : badge"
          class="rounded-full px-2.5 py-1 text-xs/5 font-semibold"
          :class="tone.badge"
        >
          <slot v-if="isContent" name="badge" />
          <template v-else>{{ badge }}</template>
        </p>
      </div>
      <p v-if="isContent ? $slots.default : description" :class="[classes.description, tone.text]">
        <slot v-if="isContent" />
        <template v-else>{{ description }}</template>
      </p>
    </div>

    <div
      v-if="(isContent ? $slots.price || $slots.note : price || note) || $slots.links"
      :class="classes.offer"
    >
      <p v-if="isContent ? $slots.note : note" :class="[classes.note, tone.text]">
        <slot v-if="isContent" name="note" />
        <template v-else>{{ note }}</template>
      </p>
      <p
        v-if="isContent ? $slots.price : price"
        class="flex flex-wrap items-baseline gap-x-1"
        :class="classes.price"
      >
        <span class="text-4xl font-semibold tracking-tight" :class="[tone.price, { 'sm:text-5xl': wide }]">
          <slot v-if="isContent" name="price" />
          <template v-else>{{ price }}</template>
        </span>
        <span v-if="isContent ? $slots.period : period" class="text-sm/6 font-semibold" :class="tone.text">
          <slot v-if="isContent" name="period" />
          <template v-else>{{ period }}</template>
        </span>
      </p>
      <div v-if="$slots.links" class="flex flex-col gap-3 [&>*]:w-full" :class="classes.links">
        <slot name="links" />
      </div>
    </div>

    <div
      v-if="isContent ? $slots.features : features.length"
      class="text-sm/6"
      :class="[classes.features, tone.text]"
    >
      <slot v-if="isContent" name="features" />
      <ul v-else role="list">
        <li v-for="(feature, i) in features" :key="i">{{ feature }}</li>
      </ul>
    </div>
  </div>
</template>
