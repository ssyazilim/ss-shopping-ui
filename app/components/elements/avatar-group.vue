<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{
    avatars?: { src: string; alt?: string; name?: string }[]
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

// DATA
const overlaps = {
  xs: "-space-x-1",
  sm: "-space-x-2",
  md: "-space-x-2",
  lg: "-space-x-3",
  xl: "-space-x-3",
  "2xl": "-space-x-3",
}

// COMPUTED
const items = computed(() => (Array.isArray(props.avatars) ? props.avatars : []).filter((avatar) => avatar))
// Later siblings paint over earlier ones, so only "first on top" needs explicit stacking
const zIndex = (index: number) => (props.order === "first-on-top" ? items.value.length - index : undefined)
</script>

<template>
  <div v-if="items.length" class="isolate flex overflow-hidden rtl:space-x-reverse" :class="overlaps[size]">
    <elements-avatar
      v-for="(avatar, i) in items"
      :key="i"
      :src="avatar.src"
      :alt="avatar.alt"
      :name="avatar.name"
      :size="size"
      :shape="shape"
      class="relative ring-2 ring-white dark:ring-gray-900"
      :style="{ zIndex: zIndex(i) }"
    />
  </div>
</template>
