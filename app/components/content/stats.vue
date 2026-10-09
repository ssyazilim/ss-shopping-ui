<script setup lang="ts">
withDefaults(
  defineProps<{
    layout?: "stacked" | "split" | "side"
    variant?: "plain" | "bordered" | "tiles" | "cards" | "timeline"
    align?: "start" | "center"
    background?: "none" | "blobs" | "grid" | "skew"
    stats?: { value: string; label: string; description: string }[]
    image?: string
    imagedark?: string
    alt?: string
    hideimages?: boolean
  }>(),
  {
    layout: "stacked",
    variant: "plain",
    align: "start",
    background: "none",
    stats: () => [],
    image: "",
    imagedark: "",
    alt: "",
    hideimages: false,
  }
)
</script>

<template>
  <sections-stats-main
    is-content
    :layout="layout"
    :stat-style="variant"
    :align="align"
    :background="background"
    :stats="stats"
    :image="hideimages ? '' : image"
    :image-dark="imagedark"
    :image-alt="alt"
  >
    <template v-if="$slots.eyebrow" #eyebrow>
      <slot name="eyebrow" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.title" #title>
      <slot name="title" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.default" #default>
      <slot />
    </template>
    <template v-if="$slots.links" #links>
      <slot name="links" mdc-unwrap="p" />
    </template>
  </sections-stats-main>
</template>
