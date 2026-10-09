<script setup lang="ts">
withDefaults(
  defineProps<{
    layout?: "side" | "accordion" | "rows" | "grid"
    columns?: "2" | "3"
    align?: "start" | "center"
    background?: "none" | "blobs" | "grid" | "skew"
    faqs?: { question: string; answer: string }[]
  }>(),
  {
    layout: "side",
    columns: "3",
    align: "start",
    background: "none",
    faqs: () => [],
  }
)
</script>

<template>
  <sections-faq-main
    is-content
    :layout="layout"
    :columns="columns"
    :align="align"
    :background="background"
    :faqs="faqs"
  >
    <template v-if="$slots.title" #title>
      <slot name="title" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.default" #default>
      <slot mdc-unwrap="p" />
    </template>
  </sections-faq-main>
</template>
