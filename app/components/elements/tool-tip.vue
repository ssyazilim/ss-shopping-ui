<script setup lang="ts">
// PROPS
withDefaults(
  defineProps<{
    position?: "top" | "bottom" | "left" | "right"
    color?: "red" | "green" | "orange" | "indigo" | "yellow" | "gray"
    contentClass?: string
  }>(),
  {
    position: "top",
    color: "gray",
    contentClass: "",
  }
)

// DATA
const show = ref(false)
const colors = {
  red: "border-red-400 bg-red-50 text-red-400 dark:border-red-500 dark:bg-red-900 dark:text-red-500",
  green:
    "border-green-400 bg-green-50 text-green-400 dark:border-green-500 dark:bg-green-900 dark:text-green-500",
  orange:
    "border-orange-400 bg-orange-50 text-orange-400 dark:border-orange-500 dark:bg-orange-900 dark:text-orange-500",
  indigo:
    "border-indigo-400 bg-indigo-50 text-indigo-400 dark:border-indigo-500 dark:bg-indigo-900 dark:text-indigo-500",
  yellow:
    "border-yellow-400 bg-yellow-50 text-yellow-400 dark:border-yellow-500 dark:bg-yellow-900 dark:text-yellow-500",
  gray: "border-gray-400 bg-gray-100 text-gray-600 dark:border-gray-500 dark:bg-gray-900 dark:text-gray-500",
}
const positions = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
}
</script>

<template>
  <div class="relative inline-block">
    <div
      class="flex flex-col"
      @mouseenter="show = true"
      @mouseleave="show = false"
      @focusin="show = true"
      @focusout="show = false"
    >
      <slot />
    </div>

    <transition
      enter-active-class="transition duration-100"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="show"
        class="absolute z-40 flex flex-col items-start overflow-hidden rounded-lg p-2 font-semibold shadow-lg"
        :class="[colors[color], positions[position], contentClass]"
      >
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>
