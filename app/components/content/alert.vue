<script setup lang="ts">
withDefaults(defineProps<{ color?: "red" | "green" | "indigo" | "yellow" }>(), {
  color: "indigo",
})
</script>

<template>
  <elements-alert is-content :color="color">
    <slot mdc-unwrap="p" />
  </elements-alert>
</template>
