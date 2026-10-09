<script setup lang="ts">
// PROPS
withDefaults(
  defineProps<{
    width?: "narrow" | "medium" | "wide" | "full"
    spacing?: "none" | "small" | "medium" | "large"
    // Space between the blocks placed inside
    gap?: "none" | "small" | "medium" | "large"
  }>(),
  {
    width: "narrow",
    spacing: "medium",
    gap: "medium",
  }
)

// DATA
const widths = {
  narrow: "max-w-3xl",
  medium: "max-w-5xl",
  wide: "",
  full: "",
}
const spacings = {
  none: "",
  small: "py-8 sm:py-12",
  medium: "py-16 sm:py-20",
  large: "py-24 sm:py-32",
}
const gaps = {
  none: "",
  small: "gap-4",
  medium: "gap-8",
  large: "gap-12 sm:gap-16",
}
</script>

<template>
  <div :class="spacings[spacing]">
    <div class="mx-auto px-6 lg:px-8" :class="width === 'full' ? 'max-w-none' : 'max-w-7xl'">
      <div class="mx-auto flex flex-col" :class="[widths[width], gaps[gap]]">
        <slot />
      </div>
    </div>
  </div>
</template>
