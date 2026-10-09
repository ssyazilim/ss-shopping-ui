<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    layout?: "grid" | "split" | "tiles"
    align?: "center" | "start"
    background?: "none" | "blobs" | "grid" | "skew"
    logos?: { image: string; imagedark: string; alt: string; link: string }[]
  }>(),
  {
    layout: "grid",
    align: "center",
    background: "none",
    logos: () => [],
  }
)

// DATA
const localePath = useLocalePath()

// COMPUTED
const items = computed(() =>
  (Array.isArray(props.logos) ? props.logos : []).map((logo) => {
    const link = logo?.link ?? ""
    return {
      image: logo?.image ?? "",
      imageDark: logo?.imagedark ?? "",
      alt: logo?.alt ?? "",
      link: link.startsWith("/") && !link.startsWith("//") ? localePath(link) : link,
    }
  })
)
</script>

<template>
  <sections-logo-cloud-main
    is-content
    :layout="layout"
    :align="align"
    :background="background"
    :logos="items"
  >
    <template v-if="$slots.title" #title>
      <slot name="title" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.default" #default>
      <slot mdc-unwrap="p" />
    </template>
    <template v-if="$slots.links" #links>
      <slot name="links" mdc-unwrap="p" />
    </template>
  </sections-logo-cloud-main>
</template>
