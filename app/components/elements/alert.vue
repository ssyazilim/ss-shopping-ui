<script setup lang="ts">
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/20/solid"

// PROPS
const props = withDefaults(
  defineProps<{
    title?: string
    message?: string
    color?: "red" | "green" | "indigo" | "yellow"
    variant?: "accent" | "soft"
    // Shows a close button; a closed alert stays hidden only until the page is reloaded
    dismissible?: boolean
    isContent?: boolean
  }>(),
  {
    title: "",
    message: "",
    color: "indigo",
    variant: "accent",
    dismissible: false,
    isContent: false,
  }
)

// DATA
const visible = ref(true)
const styles = {
  red: {
    icon: XCircleIcon,
    box: "bg-red-50 dark:bg-red-500/15",
    border: "border-red-400 dark:border-red-500",
    outline: "dark:outline dark:outline-1 dark:outline-red-500/25",
    iconClass: "text-red-400",
    title: "text-red-800 dark:text-red-200",
    text: "text-red-700 dark:text-red-200/80",
    close: "text-red-500 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-500/10",
  },
  green: {
    icon: CheckCircleIcon,
    box: "bg-green-50 dark:bg-green-500/10",
    border: "border-green-400 dark:border-green-500",
    outline: "dark:outline dark:outline-1 dark:outline-green-500/20",
    iconClass: "text-green-400",
    title: "text-green-800 dark:text-green-200",
    text: "text-green-700 dark:text-green-200/85",
    close: "text-green-500 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-500/10",
  },
  indigo: {
    icon: InformationCircleIcon,
    box: "bg-indigo-50 dark:bg-indigo-500/10",
    border: "border-indigo-400 dark:border-indigo-500",
    outline: "dark:outline dark:outline-1 dark:outline-indigo-500/20",
    iconClass: "text-indigo-400",
    title: "text-indigo-800 dark:text-indigo-200",
    text: "text-indigo-700 dark:text-indigo-300",
    close: "text-indigo-500 hover:bg-indigo-100 dark:text-indigo-400 dark:hover:bg-indigo-500/10",
  },
  yellow: {
    icon: ExclamationTriangleIcon,
    box: "bg-yellow-50 dark:bg-yellow-500/10",
    border: "border-yellow-400 dark:border-yellow-500",
    outline: "dark:outline dark:outline-1 dark:outline-yellow-500/15",
    iconClass: "text-yellow-400 dark:text-yellow-300",
    title: "text-yellow-800 dark:text-yellow-100",
    text: "text-yellow-700 dark:text-yellow-100/80",
    close: "text-yellow-500 hover:bg-yellow-100 dark:text-yellow-300 dark:hover:bg-yellow-500/10",
  },
}

// METHODS
const slots = useSlots()
const hasTitle = () => (props.isContent ? !!slots.title : !!props.title)
const hasMessage = () => (props.isContent ? !!slots.default : !!props.message)

// COMPUTED
const style = computed(() => styles[props.color] ?? styles.indigo)
</script>

<template>
  <div
    v-if="visible"
    class="p-4"
    :class="[style.box, variant === 'soft' ? ['rounded-md', style.outline] : ['border-s-4', style.border]]"
  >
    <div class="flex">
      <div class="shrink-0">
        <component :is="style.icon" class="size-5" :class="style.iconClass" aria-hidden="true" />
      </div>
      <div class="ms-3 flex-1">
        <h3 v-if="hasTitle()" class="text-sm font-medium" :class="style.title">
          <slot v-if="isContent" name="title" />
          <template v-else>{{ title }}</template>
        </h3>
        <!-- Without a title the message itself is the headline, as in the one-line examples -->
        <div
          v-if="hasMessage()"
          class="text-sm first:mt-0 [&>*+*]:mt-2 [&_a]:font-medium [&_a]:underline [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:ps-5 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:ps-5"
          :class="[
            hasTitle() ? ['mt-2', style.text] : ['font-medium', style.title],
            { 'whitespace-pre-line': !isContent },
          ]"
        >
          <slot v-if="isContent" />
          <template v-else>{{ message }}</template>
        </div>
        <div v-if="$slots.action" class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          <slot name="action" />
        </div>
      </div>
      <div v-if="dismissible" class="ms-auto ps-3">
        <div class="-m-1.5">
          <button
            type="button"
            class="inline-flex rounded-md p-1.5"
            :class="style.close"
            @click="visible = false"
          >
            <span class="sr-only">Close</span>
            <XMarkIcon class="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
