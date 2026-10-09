<script setup lang="ts">
// PROPS
withDefaults(
  defineProps<{
    src?: string
  }>(),
  {
    src: "",
  }
)
</script>

<template>
  <!-- Decorative full-bleed photo; without a photo the dark base keeps the white text readable -->
  <div class="absolute inset-0 -z-10 bg-gray-900" aria-hidden="true">
    <img v-if="src" :src="src" alt="" class="size-full object-cover" />
    <div class="absolute inset-0 bg-gray-900/50" />
  </div>
</template>
