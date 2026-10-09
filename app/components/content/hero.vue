<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    layout?: "centered" | "split" | "half" | "angled" | "offset" | "tiles"
    background?: "blobs" | "grid" | "skew" | "none"
    images?: { src: string; darksrc: string; alt: string }[]
    hideimages?: boolean
  }>(),
  {
    layout: "centered",
    background: "blobs",
    images: () => [],
    hideimages: false,
  }
)

// COMPUTED
const items = computed(() =>
  props.hideimages || !Array.isArray(props.images)
    ? []
    : props.images.map((image) => ({ ...image, darkSrc: image?.darksrc ?? "" }))
)
</script>

<template>
  <sections-hero-main is-content :layout="layout" :background="background" :images="items">
    <template v-if="$slots.eyebrow" #eyebrow>
      <slot name="eyebrow" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.title" #title>
      <slot name="title" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.default" #default>
      <slot mdc-unwrap="p" />
    </template>
    <template v-if="$slots.links" #links>
      <slot name="links" mdc-unwrap="p" />
    </template>
  </sections-hero-main>
</template>
