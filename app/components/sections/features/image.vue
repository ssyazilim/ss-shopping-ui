<script setup lang="ts">
// PROPS
withDefaults(
  defineProps<{
    sources?: { src: string; class: string }[]
    alt?: string
    imageStyle?: "plain" | "frame" | "panel"
  }>(),
  {
    sources: () => [],
    alt: "",
    imageStyle: "plain",
  }
)
</script>

<template>
  <!-- A thin indigo band around the image, as thick as the frame -->
  <div
    v-if="imageStyle === 'panel'"
    class="rounded-[calc(theme(borderRadius.xl)+theme(spacing.2))] bg-indigo-500 p-2 shadow-sm"
  >
    <img
      v-for="source in sources"
      :key="source.src"
      :src="source.src"
      :alt="alt"
      class="w-full rounded-xl"
      :class="source.class"
    />
  </div>
  <div v-else class="relative">
    <div
      v-if="imageStyle === 'frame'"
      class="absolute -inset-2 rounded-[calc(theme(borderRadius.xl)+theme(spacing.2))] shadow-sm ring-1 ring-black/5 dark:bg-white/[0.025] dark:ring-white/10"
    />
    <img
      v-for="source in sources"
      :key="source.src"
      :src="source.src"
      :alt="alt"
      class="relative w-full rounded-xl shadow-xl ring-1 ring-gray-900/10 dark:ring-white/10"
      :class="source.class"
    />
  </div>
</template>
