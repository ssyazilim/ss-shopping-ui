<script setup lang="ts">
// PROPS
withDefaults(defineProps<{ title?: string; text?: string; isContent?: boolean }>(), {
  title: "",
  text: "",
  isContent: false,
})
</script>

<template>
  <div
    class="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1"
  >
    <div
      class="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      aria-hidden="true"
    >
      <div
        class="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#2563eb] to-[#6366f1] opacity-30"
        style="
          clip-path: polygon(
            74.8% 41.9%,
            97.2% 73.2%,
            100% 34.9%,
            92.5% 0.4%,
            87.5% 0%,
            75% 28.6%,
            58.5% 54.6%,
            50.1% 56.8%,
            46.9% 44%,
            48.3% 17.4%,
            24.7% 53.9%,
            0% 27.9%,
            11.9% 74.2%,
            24.9% 54.1%,
            68.6% 100%,
            74.8% 41.9%
          );
        "
      />
    </div>
    <div
      class="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      aria-hidden="true"
    >
      <div
        class="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#6366f1] to-[#2563eb] opacity-30"
        style="
          clip-path: polygon(
            74.8% 41.9%,
            97.2% 73.2%,
            100% 34.9%,
            92.5% 0.4%,
            87.5% 0%,
            75% 28.6%,
            58.5% 54.6%,
            50.1% 56.8%,
            46.9% 44%,
            48.3% 17.4%,
            24.7% 53.9%,
            0% 27.9%,
            11.9% 74.2%,
            24.9% 54.1%,
            68.6% 100%,
            74.8% 41.9%
          );
        "
      />
    </div>
    <p class="text-sm leading-6 text-gray-900">
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
    <div class="flex flex-1 justify-end" />
  </div>
</template>
