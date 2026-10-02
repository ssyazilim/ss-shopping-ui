<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: "gray" | "indigo" | "purple" | "blue" | "green" | "pink" | "yellow" | "orange" | "red"
    showDot?: boolean
  }>(),
  {
    color: "indigo",
    showDot: false,
  }
)
</script>

<template>
  <elements-badge is-content :color="color" :show-dot="showDot">
    <slot mdc-unwrap="p" />
  </elements-badge>
</template>
