<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router"

// PROPS
const props = withDefaults(
  defineProps<{
    text?: string
    color?: string
    variant?: "flat" | "border" | "outline"
    shape?: "pill" | "rounded"
    size?: "md" | "sm"
    showDot?: boolean
    removable?: boolean
    removeLabel?: string
    to?: RouteLocationRaw
    isContent?: boolean
  }>(),
  {
    text: "",
    color: "indigo",
    variant: "flat",
    shape: "pill",
    size: "md",
    showDot: false,
    removable: false,
    removeLabel: "Remove",
    to: undefined,
    isContent: false,
  }
)

// EMITS
const emit = defineEmits<{ remove: [] }>()

// DATA
const NuxtLink = resolveComponent("NuxtLink")
const styles = {
  gray: {
    flat: "bg-gray-100 text-gray-600 dark:bg-gray-400/10 dark:text-gray-400",
    border:
      "bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20",
    dot: "fill-gray-400",
    remove: "hover:bg-gray-500/20 dark:hover:bg-gray-400/20",
    stroke:
      "stroke-gray-700/50 group-hover:stroke-gray-700/75 dark:stroke-gray-400 dark:group-hover:stroke-gray-300",
  },
  red: {
    flat: "bg-red-100 text-red-700 dark:bg-red-400/10 dark:text-red-400",
    border:
      "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20",
    dot: "fill-red-500 dark:fill-red-400",
    remove: "hover:bg-red-600/20 dark:hover:bg-red-400/20",
    stroke:
      "stroke-red-700/50 group-hover:stroke-red-700/75 dark:stroke-red-400 dark:group-hover:stroke-red-300",
  },
  orange: {
    flat: "bg-orange-100 text-orange-700 dark:bg-orange-400/10 dark:text-orange-400",
    border:
      "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20 dark:bg-orange-400/10 dark:text-orange-400 dark:ring-orange-400/20",
    dot: "fill-orange-500 dark:fill-orange-400",
    remove: "hover:bg-orange-600/20 dark:hover:bg-orange-400/20",
    stroke:
      "stroke-orange-700/50 group-hover:stroke-orange-700/75 dark:stroke-orange-400 dark:group-hover:stroke-orange-300",
  },
  yellow: {
    flat: "bg-yellow-100 text-yellow-800 dark:bg-yellow-400/10 dark:text-yellow-500",
    border:
      "bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20",
    dot: "fill-yellow-500 dark:fill-yellow-400",
    remove: "hover:bg-yellow-600/20 dark:hover:bg-yellow-400/20",
    stroke:
      "stroke-yellow-800/50 group-hover:stroke-yellow-800/75 dark:stroke-yellow-400 dark:group-hover:stroke-yellow-300",
  },
  green: {
    flat: "bg-green-100 text-green-700 dark:bg-green-400/10 dark:text-green-400",
    border:
      "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:ring-green-500/20",
    dot: "fill-green-500 dark:fill-green-400",
    remove: "hover:bg-green-600/20 dark:hover:bg-green-400/20",
    stroke:
      "stroke-green-800/50 group-hover:stroke-green-800/75 dark:stroke-green-400 dark:group-hover:stroke-green-300",
  },
  blue: {
    flat: "bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-400",
    border:
      "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30",
    dot: "fill-blue-500 dark:fill-blue-400",
    remove: "hover:bg-blue-600/20 dark:hover:bg-blue-400/20",
    stroke:
      "stroke-blue-800/50 group-hover:stroke-blue-800/75 dark:stroke-blue-400 dark:group-hover:stroke-blue-300",
  },
  indigo: {
    flat: "bg-indigo-100 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-400",
    border:
      "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-indigo-400/10 dark:text-indigo-400 dark:ring-indigo-400/30",
    dot: "fill-indigo-500 dark:fill-indigo-400",
    remove: "hover:bg-indigo-600/20 dark:hover:bg-indigo-400/20",
    stroke:
      "stroke-indigo-700/50 group-hover:stroke-indigo-700/75 dark:stroke-indigo-400 dark:group-hover:stroke-indigo-300",
  },
  purple: {
    flat: "bg-purple-100 text-purple-700 dark:bg-purple-400/10 dark:text-purple-400",
    border:
      "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30",
    dot: "fill-purple-500 dark:fill-purple-400",
    remove: "hover:bg-purple-600/20 dark:hover:bg-purple-400/20",
    stroke:
      "stroke-purple-700/50 group-hover:stroke-purple-700/75 dark:stroke-purple-400 dark:group-hover:stroke-purple-300",
  },
  pink: {
    flat: "bg-pink-100 text-pink-700 dark:bg-pink-400/10 dark:text-pink-400",
    border:
      "bg-pink-50 text-pink-700 ring-1 ring-inset ring-pink-700/10 dark:bg-pink-400/10 dark:text-pink-400 dark:ring-pink-400/20",
    dot: "fill-pink-500 dark:fill-pink-400",
    remove: "hover:bg-pink-600/20 dark:hover:bg-pink-400/20",
    stroke:
      "stroke-pink-800/50 group-hover:stroke-pink-800/75 dark:stroke-pink-400 dark:group-hover:stroke-pink-300",
  },
}
const outline = "text-gray-900 ring-1 ring-inset ring-gray-200 dark:text-white dark:ring-white/10"

// COMPUTED
const style = computed(() => styles[props.color as keyof typeof styles] ?? styles.gray)
const dot = computed(() => props.showDot)
const classes = computed(() => [
  "inline-flex items-center text-xs font-medium",
  props.size === "sm" ? "px-1.5 py-0.5" : "px-2 py-1",
  props.shape === "rounded" ? "rounded-md" : "rounded-full",
  props.removable ? "gap-x-0.5" : props.size === "sm" ? "gap-x-1" : "gap-x-1.5",
  props.variant === "outline" ? outline : props.variant === "border" ? style.value.border : style.value.flat,
  { "hover:opacity-80": props.to },
])
</script>

<template>
  <component :is="to ? NuxtLink : 'span'" :to="to" :class="classes">
    <svg v-if="dot" class="size-1.5" :class="style.dot" viewBox="0 0 6 6" aria-hidden="true">
      <circle cx="3" cy="3" r="3" />
    </svg>
    <slot v-if="isContent" />
    <template v-else>{{ text }}</template>
    <button
      v-if="removable"
      type="button"
      class="group relative -me-1 size-3.5 rounded-sm"
      :class="style.remove"
      @click.stop.prevent="emit('remove')"
    >
      <span class="sr-only">{{ removeLabel }}</span>
      <svg viewBox="0 0 14 14" class="size-3.5" :class="style.stroke">
        <path d="M4 4l6 6m0-6l-6 6" />
      </svg>
      <span class="absolute -inset-1" />
    </button>
  </component>
</template>
