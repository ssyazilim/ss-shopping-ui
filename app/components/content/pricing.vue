<script setup lang="ts">
withDefaults(
  defineProps<{
    layout?: "cards" | "joined" | "divided" | "wide"
    highlight?: "ring" | "dark" | "none"
    background?: "none" | "blobs" | "band"
    align?: "center" | "start"
  }>(),
  {
    layout: "cards",
    highlight: "ring",
    background: "none",
    align: "center",
  }
)
</script>

<template>
  <sections-pricing-main
    is-content
    :layout="layout"
    :highlight="highlight"
    :background="background"
    :heading-align="align"
  >
    <template v-if="$slots.eyebrow" #eyebrow>
      <slot name="eyebrow" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.title" #title>
      <slot name="title" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.description" #description>
      <slot name="description" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </sections-pricing-main>
</template>
