<script setup lang="ts">
// PROPS
withDefaults(defineProps<{ images?: { src: string; alt: string }[] }>(), {
  images: () => [],
})

// DATA
const columns = [
  {
    class:
      "ms-auto w-44 flex-none space-y-8 pt-32 sm:ms-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80",
    indexes: [0],
  },
  { class: "me-auto w-44 flex-none space-y-8 sm:me-0 sm:pt-52 lg:pt-36", indexes: [1, 2] },
  { class: "w-44 flex-none space-y-8 pt-32 sm:pt-0", indexes: [3, 4] },
]
</script>

<template>
  <div class="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:ps-20 lg:mt-0 lg:ps-0">
    <div v-for="(column, c) in columns" :key="c" :class="column.class">
      <template v-for="i in column.indexes" :key="i">
        <div v-if="images[i]?.src" class="relative">
          <img
            :src="images[i]?.src"
            :alt="images[i]?.alt"
            class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg dark:bg-gray-700/5"
          />
          <div
            class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10 dark:ring-white/10"
          />
        </div>
      </template>
    </div>
  </div>
</template>
