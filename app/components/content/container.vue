<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: "narrow" | "medium" | "wide" | "full"
    spacing?: "none" | "small" | "medium" | "large"
    gap?: "none" | "small" | "medium" | "large"
  }>(),
  {
    width: "narrow",
    spacing: "medium",
    gap: "medium",
  }
)
</script>

<template>
  <layouts-container :width="width" :spacing="spacing" :gap="gap">
    <slot />
  </layouts-container>
</template>
