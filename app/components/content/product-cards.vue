<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    columns?: "2" | "3" | "4"
    align?: "start" | "center"
    ratio?: "square" | "wide"
    products?: { image: string; alt: string; name: string; description: string; to: string }[]
  }>(),
  {
    columns: "3",
    align: "start",
    ratio: "square",
    products: () => [],
  }
)

// DATA
const localePath = useLocalePath()

// COMPUTED
const items = computed(() =>
  (Array.isArray(props.products) ? props.products : []).map((product) => {
    const to = product?.to ?? ""
    return {
      image: product?.image ?? "",
      alt: product?.alt ?? "",
      name: product?.name ?? "",
      description: product?.description ?? "",
      to: to.startsWith("/") && !to.startsWith("//") ? localePath(to) : to,
    }
  })
)
</script>

<template>
  <sections-products-cards is-content :columns="columns" :align="align" :ratio="ratio" :products="items">
    <template v-if="$slots.eyebrow" #eyebrow>
      <slot name="eyebrow" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.title" #title>
      <slot name="title" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.default" #default>
      <slot mdc-unwrap="p" />
    </template>
  </sections-products-cards>
</template>
