<script setup lang="ts">
// PROPS
withDefaults(defineProps<{ src: string; darkSrc?: string; alt?: string; wide?: boolean }>(), {
  darkSrc: "",
  alt: "",
  wide: false,
})
</script>

<template>
  <div>
    <img
      :src="src"
      :alt="alt"
      class="rounded-md bg-gray-50 shadow-xl ring-1 ring-gray-900/10 dark:bg-white/5 dark:shadow-2xl dark:ring-white/10"
      :class="{ 'w-[76rem]': wide, 'dark:hidden': darkSrc }"
    />
    <img
      v-if="darkSrc"
      :src="darkSrc"
      :alt="alt"
      class="hidden rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 dark:block"
      :class="{ 'w-[76rem]': wide }"
    />
  </div>
</template>
