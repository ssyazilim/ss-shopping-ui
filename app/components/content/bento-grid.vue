<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    layout?: "pillars" | "zigzag" | "two-three"
    imageposition?: "top" | "bottom"
    align?: "start" | "center"
    cards?: {
      eyebrow: string
      title: string
      description: string
      image: string
      imagedark: string
      alt: string
    }[]
  }>(),
  {
    layout: "pillars",
    imageposition: "top",
    align: "start",
    cards: () => [],
  }
)

// COMPUTED
const items = computed(() =>
  (Array.isArray(props.cards) ? props.cards : []).map((card) => ({
    ...card,
    imageDark: card?.imagedark ?? "",
    imageAlt: card?.alt ?? "",
  }))
)
</script>

<template>
  <sections-bento-main
    is-content
    :layout="layout"
    :image-position="imageposition"
    :heading-align="align"
    :cards="items"
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
  </sections-bento-main>
</template>
