<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    columns?: "1" | "2"
    reverse?: boolean
    specs?: { name: string; description: string }[]
    images?: { image: string; alt: string }[]
  }>(),
  {
    columns: "2",
    reverse: false,
    specs: () => [],
    images: () => [],
  }
)

// COMPUTED
const items = computed(() =>
  (Array.isArray(props.specs) ? props.specs : []).map((spec) => ({
    name: spec?.name ?? "",
    description: spec?.description ?? "",
  }))
)
const photos = computed(() =>
  (Array.isArray(props.images) ? props.images : []).map((photo) => ({
    image: photo?.image ?? "",
    alt: photo?.alt ?? "",
  }))
)
</script>

<template>
  <sections-products-specs is-content :columns="columns" :reverse="reverse" :specs="items" :images="photos">
    <template v-if="$slots.eyebrow" #eyebrow>
      <slot name="eyebrow" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.title" #title>
      <slot name="title" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.default" #default>
      <slot mdc-unwrap="p" />
    </template>
  </sections-products-specs>
</template>
