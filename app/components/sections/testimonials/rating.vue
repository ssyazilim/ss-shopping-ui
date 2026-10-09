<script setup lang="ts">
// PROPS
const props = withDefaults(defineProps<{ rating?: string }>(), {
  rating: "",
})

// COMPUTED
const stars = computed(() => {
  const value = Math.round(Number(props.rating))
  return Number.isFinite(value) ? Math.min(5, Math.max(0, value)) : 0
})
</script>

<template>
  <div v-if="stars" class="flex gap-x-1">
    <span class="sr-only">{{ stars }}/5</span>
    <Icon
      v-for="i in 5"
      :key="i"
      name="i-heroicons:star-20-solid"
      class="size-5 flex-none"
      :class="i <= stars ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-300 dark:text-gray-600'"
      aria-hidden="true"
    />
  </div>
</template>
