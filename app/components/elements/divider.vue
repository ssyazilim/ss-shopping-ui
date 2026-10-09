<script setup lang="ts">
// PROPS
withDefaults(defineProps<{ text?: string; isContent?: boolean }>(), {
  text: "",
  isContent: false,
})
</script>

<template>
  <div class="relative">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="w-full border-t border-gray-300 dark:border-gray-600" />
    </div>
    <div v-if="isContent ? $slots.default : text" class="relative flex justify-center">
      <span class="bg-white px-2 text-xl text-gray-500 dark:bg-slate-800 dark:text-gray-400">
        <slot v-if="isContent" />
        <template v-else>{{ text }}</template>
      </span>
    </div>
  </div>
</template>
