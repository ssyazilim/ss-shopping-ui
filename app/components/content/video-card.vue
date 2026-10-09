<script setup lang="ts">
withDefaults(
  defineProps<{
    // Studio offers its video picker for a "src" prop on a block named video-…
    src?: string
  }>(),
  {
    src: "",
  }
)
</script>

<template>
  <sections-videos-card :src="src" />
</template>
