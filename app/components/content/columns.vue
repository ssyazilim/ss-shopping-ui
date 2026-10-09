<script setup lang="ts">
withDefaults(
  defineProps<{
    leftwidth?: "quarter" | "third" | "half"
    rightwidth?: "quarter" | "third" | "half"
    divided?: boolean
    sticky?: boolean
  }>(),
  {
    leftwidth: "third",
    rightwidth: "third",
    divided: false,
    sticky: false,
  }
)
</script>

<template>
  <layouts-columns :left-width="leftwidth" :right-width="rightwidth" :divided="divided" :sticky="sticky">
    <template v-if="$slots.left" #left>
      <slot name="left" />
    </template>
    <template v-if="$slots.default" #default>
      <slot />
    </template>
    <template v-if="$slots.right" #right>
      <slot name="right" />
    </template>
  </layouts-columns>
</template>
