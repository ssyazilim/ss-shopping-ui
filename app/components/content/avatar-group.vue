<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    avatars?: { image: string; alt: string; name: string }[]
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
    shape?: "circle" | "rounded"
    order?: "first-on-top" | "last-on-top"
  }>(),
  {
    avatars: () => [],
    size: "md",
    shape: "circle",
    order: "last-on-top",
  }
)

// COMPUTED
const items = computed(() =>
  (Array.isArray(props.avatars) ? props.avatars : []).map((avatar) => ({
    src: avatar?.image ?? "",
    alt: avatar?.alt ?? "",
    name: avatar?.name ?? "",
  }))
)
</script>

<template>
  <elements-avatar-group :avatars="items" :size="size" :shape="shape" :order="order" />
</template>
