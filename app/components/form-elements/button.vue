<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router"

// PROPS
const props = withDefaults(
  defineProps<{
    text?: string
    color?: "indigo" | "violet" | "sky" | "green" | "lime" | "yellow" | "red" | "slate" | "stone"
    to?: RouteLocationRaw
    type?: "button" | "submit" | "reset"
    disabled?: boolean
    iconAfter?: boolean
    isContent?: boolean
  }>(),
  {
    text: "",
    color: "indigo",
    to: undefined,
    type: "button",
    disabled: false,
    iconAfter: false,
    isContent: false,
  }
)

// DATA
const NuxtLink = resolveComponent("NuxtLink")
const styles = {
  indigo: {
    active:
      "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600 dark:bg-indigo-300 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-300",
    passive: "bg-indigo-200 text-white dark:bg-indigo-700",
  },
  violet: {
    active:
      "bg-violet-600 text-white hover:bg-violet-500 focus-visible:outline-violet-600 dark:bg-violet-300 dark:hover:bg-violet-400 dark:focus-visible:outline-violet-300",
    passive: "bg-violet-200 text-white dark:bg-violet-700",
  },
  sky: {
    active:
      "bg-sky-600 text-white hover:bg-sky-500 focus-visible:outline-sky-600 dark:bg-sky-300 dark:hover:bg-sky-400 dark:focus-visible:outline-sky-300",
    passive: "bg-sky-200 text-white dark:bg-sky-700",
  },
  green: {
    active:
      "bg-green-600 text-white hover:bg-green-500 focus-visible:outline-green-600 dark:bg-green-300 dark:hover:bg-green-400 dark:focus-visible:outline-green-300",
    passive: "bg-green-200 text-white dark:bg-green-700",
  },
  lime: {
    active:
      "bg-lime-600 text-white hover:bg-lime-500 focus-visible:outline-lime-600 dark:bg-lime-300 dark:hover:bg-lime-400 dark:focus-visible:outline-lime-300",
    passive: "bg-lime-200 text-white dark:bg-lime-700",
  },
  yellow: {
    active:
      "bg-yellow-600 text-white hover:bg-yellow-500 focus-visible:outline-yellow-600 dark:bg-yellow-300 dark:hover:bg-yellow-400 dark:focus-visible:outline-yellow-300",
    passive: "bg-yellow-200 text-white dark:bg-yellow-700",
  },
  red: {
    active:
      "bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600 dark:bg-red-300 dark:hover:bg-red-400 dark:focus-visible:outline-red-300",
    passive: "bg-red-200 text-white dark:bg-red-700",
  },
  slate: {
    active:
      "bg-slate-600 text-white hover:bg-slate-500 focus-visible:outline-slate-600 dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus-visible:outline-slate-300",
    passive: "bg-slate-200 text-white dark:bg-slate-700",
  },
  stone: {
    active:
      "bg-stone-100 text-slate-700 hover:bg-stone-50 focus-visible:outline-stone-400 dark:bg-stone-200 dark:hover:bg-stone-100 dark:focus-visible:outline-stone-400",
    passive: "bg-stone-50 text-slate-400 dark:bg-stone-300",
  },
}

// COMPUTED
const classes = computed(() => {
  const style = styles[props.color] ?? styles.indigo
  return [
    "inline-flex items-center justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold",
    props.disabled
      ? ["cursor-not-allowed", style.passive]
      : [
          "shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
          style.active,
        ],
  ]
})
</script>

<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    :type="to ? undefined : type"
    :disabled="to ? undefined : disabled"
    :class="classes"
  >
    <slot v-if="!iconAfter" name="icon" />
    <slot v-if="isContent" />
    <template v-else>{{ text }}</template>
    <slot v-if="iconAfter" name="icon" />
  </component>
</template>
