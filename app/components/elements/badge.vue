<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{ color?: string; text?: string; showDot?: boolean; isContent?: boolean }>(),
  {
    color: "indigo",
    text: "",
    showDot: false,
    isContent: false,
  }
)

// DATA
const styles = {
  gray: {
    badge: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200",
    dot: "fill-gray-500 dark:fill-gray-400",
  },
  indigo: {
    badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-200",
    dot: "fill-indigo-500 dark:fill-indigo-400",
  },
  purple: {
    badge: "bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-200",
    dot: "fill-purple-500 dark:fill-purple-400",
  },
  blue: {
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200",
    dot: "fill-blue-500 dark:fill-blue-400",
  },
  green: {
    badge: "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200",
    dot: "fill-green-500 dark:fill-green-400",
  },
  pink: {
    badge: "bg-pink-100 text-pink-700 dark:bg-pink-800 dark:text-pink-200",
    dot: "fill-pink-500 dark:fill-pink-400",
  },
  yellow: {
    badge: "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200",
    dot: "fill-yellow-500 dark:fill-yellow-400",
  },
  orange: {
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-800 dark:text-orange-200",
    dot: "fill-orange-500 dark:fill-orange-400",
  },
  red: {
    badge: "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200",
    dot: "fill-red-500 dark:fill-red-400",
  },
}

// COMPUTED
const style = computed(() => styles[props.color as keyof typeof styles] ?? styles.gray)
</script>

<template>
  <span
    class="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium"
    :class="style.badge"
  >
    <svg v-if="showDot" class="size-1.5" :class="style.dot" viewBox="0 0 6 6" aria-hidden="true">
      <circle cx="3" cy="3" r="3" />
    </svg>
    <slot v-if="isContent" />
    <template v-else>{{ text }}</template>
  </span>
</template>
