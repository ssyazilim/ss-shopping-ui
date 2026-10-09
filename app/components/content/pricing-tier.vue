<script setup lang="ts">
withDefaults(defineProps<{ featured?: boolean }>(), {
  featured: false,
})
</script>

<template>
  <sections-pricing-tier is-content :featured="featured">
    <template v-if="$slots.name" #name>
      <slot name="name" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.badge" #badge>
      <slot name="badge" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.price" #price>
      <slot name="price" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.period" #period>
      <slot name="period" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.note" #note>
      <slot name="note" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.default" #default>
      <slot mdc-unwrap="p" />
    </template>
    <template v-if="$slots.features" #features>
      <slot name="features" />
    </template>
    <template v-if="$slots.links" #links>
      <slot name="links" mdc-unwrap="p" />
    </template>
  </sections-pricing-tier>
</template>
