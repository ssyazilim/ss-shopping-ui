<script setup lang="ts">
// PROPS
withDefaults(
  defineProps<{
    variant?: "raised" | "subtle" | "filled"
    divided?: boolean
    shaded?: "none" | "header" | "body" | "footer"
  }>(),
  {
    variant: "raised",
    divided: false,
    shaded: "none",
  }
)

// DATA
const surfaces = {
  raised:
    "bg-white shadow dark:bg-gray-800/50 dark:shadow-none dark:outline dark:outline-1 dark:-outline-offset-1 dark:outline-white/10",
  subtle: "bg-gray-50 dark:bg-gray-800/50",
  filled: "bg-gray-200 dark:bg-gray-800/50",
}
const shade = "bg-gray-50 dark:bg-gray-800/50"
</script>

<template>
  <!-- Sections show only when their slot is filled; headers have less vertical padding on desktop, footers everywhere -->
  <div
    class="overflow-hidden rounded-lg"
    :class="[surfaces[variant], { 'divide-y divide-gray-200 dark:divide-white/10': divided }]"
  >
    <div v-if="$slots.header" class="px-4 py-5 sm:px-6" :class="{ [shade]: shaded === 'header' }">
      <slot name="header" />
    </div>
    <div v-if="$slots.default" class="px-4 py-5 sm:p-6" :class="{ [shade]: shaded === 'body' }">
      <slot />
    </div>
    <div v-if="$slots.footer" class="p-4 sm:px-6" :class="{ [shade]: shaded === 'footer' }">
      <slot name="footer" />
    </div>
  </div>
</template>
