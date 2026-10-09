<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    layout?: "split" | "split-reverse" | "stacked" | "centered" | "sidebar"
    variant?: "inline" | "stacked" | "box-top" | "box-side"
    imagestyle?: "plain" | "frame" | "panel"
    columns?: "2" | "3"
    features?: { name: string; description: string; icon: string; to: string; linktext: string }[]
    image?: string
    imagedark?: string
    alt?: string
    hideimages?: boolean
  }>(),
  {
    layout: "split",
    variant: "inline",
    imagestyle: "plain",
    columns: "3",
    features: () => [],
    image: "",
    imagedark: "",
    alt: "",
    hideimages: false,
  }
)

// DATA
const localePath = useLocalePath()

// COMPUTED
const items = computed(() =>
  (Array.isArray(props.features) ? props.features : []).map((feature) => {
    const to = feature?.to ?? ""
    return { ...feature, to: to.startsWith("/") ? localePath(to) : to, linkText: feature?.linktext ?? "" }
  })
)
</script>

<template>
  <sections-features-main
    is-content
    :layout="layout"
    :item-style="variant"
    :image-style="imagestyle"
    :columns="columns"
    :features="items"
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
      <slot mdc-unwrap="p" />
    </template>
    <template v-if="$slots.links" #links>
      <slot name="links" mdc-unwrap="p" />
    </template>
  </sections-features-main>
</template>
