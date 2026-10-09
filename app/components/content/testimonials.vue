<script setup lang="ts">
withDefaults(
  defineProps<{
    layout?: "single" | "portrait" | "pair" | "masonry"
    align?: "center" | "start"
    background?: "none" | "blobs" | "grid" | "skew"
    highlightfirst?: boolean
    testimonials?: {
      quote: string
      name: string
      role: string
      avatar: string
      logo: string
      rating: string
    }[]
    image?: string
    hideimages?: boolean
  }>(),
  {
    layout: "single",
    align: "center",
    background: "none",
    highlightfirst: false,
    testimonials: () => [],
    image: "",
    hideimages: false,
  }
)
</script>

<template>
  <sections-testimonials-main
    is-content
    :layout="layout"
    :align="align"
    :background="background"
    :highlight-first="highlightfirst"
    :testimonials="testimonials"
    :image="hideimages ? '' : image"
  >
    <template v-if="$slots.eyebrow" #eyebrow>
      <slot name="eyebrow" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.title" #title>
      <slot name="title" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.default" #default>
      <slot mdc-unwrap="p" />
    </template>
  </sections-testimonials-main>
</template>
