<script setup lang="ts">
// PROPS
withDefaults(
  defineProps<{
    variant?: "plain" | "raised" | "outlined" | "separate"
  }>(),
  {
    variant: "plain",
  }
)

// DATA
const variants = {
  plain: "divide-y divide-gray-200 dark:divide-white/10 [&>*]:py-4",
  raised:
    "divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:outline-1 dark:-outline-offset-1 dark:outline-white/10 [&>*]:px-6 [&>*]:py-4",
  outlined:
    "divide-y divide-gray-300 overflow-hidden rounded-md border border-gray-300 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-gray-900 [&>*]:px-6 [&>*]:py-4",
  separate:
    "space-y-3 [&>*]:overflow-hidden [&>*]:rounded-md [&>*]:bg-white [&>*]:px-6 [&>*]:py-4 [&>*]:shadow dark:[&>*]:bg-gray-800/50 dark:[&>*]:shadow-none dark:[&>*]:outline dark:[&>*]:outline-1 dark:[&>*]:-outline-offset-1 dark:[&>*]:outline-white/10",
}
</script>

<template>
  <!-- Every top-level child is one item: a paragraph, a heading or a whole block -->
  <div :class="variants[variant]">
    <slot />
  </div>
</template>
