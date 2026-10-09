<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{
    stat: { value: string; label: string; description: string }
    statStyle?: "plain" | "bordered" | "tiles" | "cards" | "timeline"
    index?: number
    centered?: boolean
    stagger?: boolean
  }>(),
  {
    statStyle: "plain",
    index: 0,
    centered: false,
    stagger: false,
  }
)

// DATA
const cards = [
  {
    root: "bg-gray-50 dark:bg-white/5",
    stagger: "sm:w-3/4 sm:max-w-md lg:w-72 lg:max-w-none lg:flex-none",
    title: "text-gray-900 dark:text-white",
    description: "text-gray-600 dark:text-gray-300",
  },
  {
    root: "bg-gray-900 dark:bg-gray-700",
    stagger: "lg:w-full lg:max-w-sm lg:flex-auto lg:gap-y-44",
    title: "text-white",
    description: "text-gray-400 dark:text-gray-300",
  },
  {
    root: "bg-indigo-600",
    stagger: "sm:w-11/12 sm:max-w-xl lg:w-full lg:max-w-none lg:flex-auto lg:gap-y-28",
    title: "text-white",
    description: "text-indigo-200 dark:text-indigo-100",
  },
]

// COMPUTED
// Cards cycle through a light, a dark and an indigo card in this fixed order
const card = computed(() => cards[props.index % cards.length] ?? cards[0]!)
const classes = computed(() => {
  switch (props.statStyle) {
    case "bordered":
      return {
        root: [
          "flex flex-col gap-y-3 border-s border-gray-900/10 ps-6 dark:border-white/10",
          { "text-center": props.centered },
        ],
        label: "text-sm/6 text-gray-600 dark:text-gray-400",
        value: "text-3xl",
      }
    case "tiles":
      return {
        root: ["flex flex-col gap-y-1 bg-gray-400/5 p-8 dark:bg-white/5", { "text-center": props.centered }],
        label: "text-sm/6 font-semibold text-gray-600 dark:text-gray-300",
        value: "text-3xl",
      }
    default:
      return {
        root: ["flex flex-col gap-y-3", { "mx-auto max-w-xs text-center": props.centered }],
        label: "text-base/7 text-gray-600 dark:text-gray-400",
        value: "text-3xl sm:text-5xl",
      }
  }
})
</script>

<template>
  <div v-if="statStyle === 'timeline'">
    <dd class="flex items-center text-sm/6 font-semibold text-indigo-600 dark:text-indigo-400">
      <svg viewBox="0 0 4 4" class="me-4 size-1 flex-none" aria-hidden="true">
        <circle cx="2" cy="2" r="2" fill="currentColor" />
      </svg>
      {{ stat.value }}
      <div
        class="absolute -ms-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ms-4 lg:static lg:-me-6 lg:ms-8 lg:w-auto lg:flex-auto lg:translate-x-0 rtl:translate-x-full lg:rtl:translate-x-0 dark:bg-white/15"
        aria-hidden="true"
      />
    </dd>
    <dt class="mt-6 text-lg/8 font-semibold tracking-tight text-gray-900 dark:text-white">
      {{ stat.label }}
    </dt>
    <dd v-if="stat.description" class="mt-1 text-base/7 text-gray-600 dark:text-gray-400">
      {{ stat.description }}
    </dd>
  </div>

  <div
    v-else-if="statStyle === 'cards'"
    class="flex flex-col-reverse justify-between gap-y-8 rounded-2xl p-8 dark:ring-1 dark:ring-inset dark:ring-white/10"
    :class="[
      card.root,
      stagger ? ['gap-x-16 sm:flex-row-reverse sm:items-end lg:flex-col lg:items-start', card.stagger] : '',
    ]"
  >
    <dd class="flex-none text-3xl font-bold tracking-tight" :class="card.title">{{ stat.value }}</dd>
    <div :class="{ 'sm:w-80 sm:shrink lg:w-auto lg:flex-none': stagger }">
      <dt class="text-lg font-semibold tracking-tight" :class="card.title">{{ stat.label }}</dt>
      <dd v-if="stat.description" class="mt-2 text-base/7" :class="card.description">
        {{ stat.description }}
      </dd>
    </div>
  </div>

  <div v-else :class="classes.root">
    <dt :class="classes.label">{{ stat.label }}</dt>
    <dd class="order-first font-semibold tracking-tight text-gray-900 dark:text-white" :class="classes.value">
      {{ stat.value }}
    </dd>
    <dd v-if="stat.description" class="text-sm/6 text-gray-500 dark:text-gray-400">{{ stat.description }}</dd>
  </div>
</template>
