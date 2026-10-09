<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: "red" | "green" | "indigo" | "yellow"
    variant?: "accent" | "soft"
    dismissible?: boolean
  }>(),
  {
    color: "indigo",
    variant: "accent",
    dismissible: false,
  }
)
</script>

<template>
  <elements-alert is-content :color="color" :variant="variant" :dismissible="dismissible">
    <template v-if="$slots.title" #title>
      <slot name="title" mdc-unwrap="p" />
    </template>
    <!-- Not unwrapped: the message may hold several paragraphs or a list -->
    <template v-if="$slots.default" #default>
      <slot />
    </template>
    <template v-if="$slots.action" #action>
      <slot name="action" mdc-unwrap="p" />
    </template>
  </elements-alert>
</template>
