<script setup lang="ts">
import {
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/outline"

// PROPS
const props = withDefaults(
  defineProps<{
    message?: string
    color?: "red" | "green" | "indigo" | "yellow"
    isContent?: boolean
  }>(),
  {
    message: "",
    color: "indigo",
    isContent: false,
  }
)

// DATA
const styles = {
  red: {
    icon: XCircleIcon,
    box: "border-red-400 bg-red-50 dark:border-red-500 dark:bg-red-900",
    iconClass: "text-red-400 dark:text-red-500",
    text: "text-red-800 dark:text-red-100",
  },
  green: {
    icon: CheckCircleIcon,
    box: "border-green-400 bg-green-50 dark:border-green-500 dark:bg-green-900",
    iconClass: "text-green-400 dark:text-green-500",
    text: "text-green-800 dark:text-green-100",
  },
  indigo: {
    icon: InformationCircleIcon,
    box: "border-indigo-400 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-900",
    iconClass: "text-indigo-400 dark:text-indigo-500",
    text: "text-indigo-800 dark:text-indigo-100",
  },
  yellow: {
    icon: ExclamationTriangleIcon,
    box: "border-yellow-400 bg-yellow-50 dark:border-yellow-500 dark:bg-yellow-900",
    iconClass: "text-yellow-400 dark:text-yellow-500",
    text: "text-yellow-800 dark:text-yellow-100",
  },
}

// COMPUTED
const style = computed(() => styles[props.color] ?? styles.indigo)
</script>

<template>
  <div class="border-l-4 p-2" :class="style.box">
    <div class="flex">
      <component :is="style.icon" class="size-5 shrink-0" :class="style.iconClass" aria-hidden="true" />
      <div class="ml-3 whitespace-pre-line text-sm font-medium" :class="style.text">
        <slot v-if="isContent" />
        <template v-else>{{ message }}</template>
      </div>
    </div>
  </div>
</template>
