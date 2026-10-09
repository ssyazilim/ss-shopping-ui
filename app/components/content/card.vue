<script setup lang="ts">
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
</script>

<template>
  <layouts-card :variant="variant" :divided="divided" :shaded="shaded">
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <template v-if="$slots.default" #default>
      <slot />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </layouts-card>
</template>
