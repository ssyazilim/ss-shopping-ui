<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/20/solid"

// PROPS
withDefaults(
  defineProps<{
    title?: string
    text?: string
    variant?: "soft" | "dark" | "brand"
    align?: "center" | "start"
    // Shows a close button; a closed banner stays hidden only until the page is reloaded
    dismissible?: boolean
    isContent?: boolean
  }>(),
  {
    title: "",
    text: "",
    variant: "soft",
    align: "center",
    dismissible: false,
    isContent: false,
  }
)

// DATA
const visible = ref(true)
const variants = {
  soft: {
    root: "bg-gray-50 dark:bg-gray-800/50 dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:bottom-0 dark:after:h-px dark:after:bg-white/10",
    text: "text-gray-900 dark:text-gray-100",
  },
  dark: {
    root: "bg-gray-900 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 dark:bg-gray-800",
    text: "text-white",
  },
  brand: {
    root: "bg-indigo-600",
    text: "text-white",
  },
}
const blob =
  "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)"
</script>

<template>
  <div
    v-if="visible"
    class="relative isolate flex items-center gap-x-6 overflow-hidden px-6 py-2.5"
    :class="[
      variants[variant].root,
      align === 'center' ? 'sm:px-3.5 sm:before:flex-1' : 'justify-between sm:pe-3.5 lg:ps-8',
    ]"
  >
    <template v-if="variant === 'soft'">
      <div
        class="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          class="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#2563eb] to-[#6366f1] opacity-30 dark:opacity-40"
          :style="{ clipPath: blob }"
        />
      </div>
      <div
        class="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          class="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#6366f1] to-[#2563eb] opacity-30 dark:opacity-40"
          :style="{ clipPath: blob }"
        />
      </div>
    </template>

    <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
      <p class="text-sm/6" :class="variants[variant].text">
        <strong v-if="isContent ? $slots.title : title" class="font-semibold">
          <slot v-if="isContent" name="title" />
          <template v-else>{{ title }}</template>
        </strong>
        <svg
          v-if="isContent ? $slots.title && $slots.default : title && text"
          viewBox="0 0 2 2"
          class="mx-2 inline size-0.5 fill-current"
          aria-hidden="true"
        >
          <circle cx="1" cy="1" r="1" />
        </svg>
        <slot v-if="isContent" />
        <template v-else>{{ text }}</template>
      </p>
      <slot name="action" />
    </div>

    <!-- Centered banners balance the leading flex-1 spacer with this one -->
    <div
      v-if="align === 'center' || dismissible"
      class="flex justify-end"
      :class="{ 'flex-1': align === 'center' }"
    >
      <button
        v-if="dismissible"
        type="button"
        class="-m-3 p-3 focus-visible:-outline-offset-4"
        :class="variants[variant].text"
        @click="visible = false"
      >
        <span class="sr-only">Close</span>
        <XMarkIcon class="size-5" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
