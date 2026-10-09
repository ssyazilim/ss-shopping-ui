<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    align?: "start" | "center"
    alternate?: boolean
    products?: { image: string; alt: string; name: string; description: string }[]
  }>(),
  {
    align: "start",
    alternate: false,
    products: () => [],
  }
)

// COMPUTED
const items = computed(() =>
  (Array.isArray(props.products) ? props.products : []).map((product) => ({
    image: product?.image ?? "",
    alt: product?.alt ?? "",
    name: product?.name ?? "",
    description: product?.description ?? "",
  }))
)
</script>

<template>
  <sections-products-rows is-content :align="align" :alternate="alternate" :products="items">
    <template v-if="$slots.eyebrow" #eyebrow>
      <slot name="eyebrow" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.title" #title>
      <slot name="title" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.default" #default>
      <slot mdc-unwrap="p" />
    </template>
  </sections-products-rows>
</template>
