<script setup lang="ts">
withDefaults(
  defineProps<{
    layout?: "centered" | "start" | "inline" | "image"
    background?: "none" | "glow" | "solid" | "soft" | "panel" | "photo" | "photo-panel"
    color?: "gray" | "slate" | "indigo" | "violet" | "sky" | "green"
    image?: string
    alt?: string
    backdrop?: string
    hideimages?: boolean
  }>(),
  {
    layout: "centered",
    background: "none",
    color: "indigo",
    image: "",
    alt: "",
    backdrop: "",
    hideimages: false,
  }
)
</script>

<template>
  <sections-cta-main
    is-content
    :layout="layout"
    :background="background"
    :color="color"
    :image="hideimages ? '' : image"
    :image-alt="alt"
    :backdrop="backdrop"
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
    <template v-if="$slots.links" #links>
      <slot name="links" mdc-unwrap="p" />
    </template>
  </sections-cta-main>
</template>
