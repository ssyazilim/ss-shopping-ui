<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "plain" | "raised" | "outlined" | "separate"
  }>(),
  {
    variant: "plain",
  }
)
</script>

<template>
  <layouts-list-container :variant="variant">
    <slot />
  </layouts-list-container>
</template>
