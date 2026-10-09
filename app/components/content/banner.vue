<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "soft" | "dark" | "brand"
    align?: "center" | "start"
    dismissible?: boolean
  }>(),
  {
    variant: "soft",
    align: "center",
    dismissible: false,
  }
)
</script>

<template>
  <elements-banner is-content :variant="variant" :align="align" :dismissible="dismissible">
    <template v-if="$slots.title" #title>
      <slot name="title" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.default" #default>
      <slot mdc-unwrap="p" />
    </template>
    <template v-if="$slots.action" #action>
      <slot name="action" mdc-unwrap="p" />
    </template>
  </elements-banner>
</template>
