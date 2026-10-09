<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color?: "gray" | "red" | "orange" | "yellow" | "green" | "blue" | "indigo" | "purple" | "pink"
    variant?: "flat" | "border" | "outline"
    shape?: "pill" | "rounded"
    size?: "md" | "sm"
    showdot?: boolean
    to?: string
  }>(),
  {
    color: "indigo",
    variant: "flat",
    shape: "pill",
    size: "md",
    showdot: false,
    to: "",
  }
)

// DATA
const localePath = useLocalePath()

// COMPUTED
const link = computed(() => (props.to.startsWith("/") ? localePath(props.to) : props.to))
</script>

<template>
  <elements-badge
    is-content
    :color="color"
    :variant="variant"
    :shape="shape"
    :size="size"
    :show-dot="showdot"
    :to="link || undefined"
  >
    <slot mdc-unwrap="p" />
  </elements-badge>
</template>
