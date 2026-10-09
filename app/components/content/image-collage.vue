<script setup lang="ts">
const props = withDefaults(
  defineProps<{ image1?: string; image2?: string; image3?: string; image4?: string }>(),
  {
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  }
)

// COMPUTED
const images = computed(() => [props.image1, props.image2, props.image3, props.image4])
</script>

<template>
  <sections-cta-image-collage is-content :images="images">
    <template v-if="$slots.title" #title>
      <slot name="title" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.default" #default>
      <slot mdc-unwrap="p" />
    </template>
    <template v-if="$slots.details" #details>
      <slot name="details" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.links" #links>
      <slot name="links" mdc-unwrap="p" />
    </template>
  </sections-cta-image-collage>
</template>
