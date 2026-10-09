<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: "compact" | "large"
    align?: "center" | "start"
    background?: "none" | "blobs" | "grid" | "skew"
    image?: string
    imagedark?: string
    hideimages?: boolean
  }>(),
  {
    size: "large",
    align: "center",
    background: "none",
    image: "",
    imagedark: "",
    hideimages: false,
  }
)
</script>

<template>
  <elements-header
    is-content
    :size="size"
    :align="align"
    :background="background"
    :image="hideimages ? '' : image"
    :image-dark="imagedark"
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
  </elements-header>
</template>
