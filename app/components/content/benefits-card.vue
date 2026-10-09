<script setup lang="ts">
withDefaults(
  defineProps<{
    benefits?: { text: string }[]
    image?: string
    alt?: string
  }>(),
  {
    benefits: () => [],
    image: "",
    alt: "",
  }
)
</script>

<template>
  <sections-cta-benefits-card is-content :benefits="benefits" :image="image" :image-alt="alt">
    <template v-if="$slots.title" #title>
      <slot name="title" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.default" #default>
      <slot mdc-unwrap="p" />
    </template>
    <template v-if="$slots.links" #links>
      <slot name="links" mdc-unwrap="p" />
    </template>
  </sections-cta-benefits-card>
</template>
