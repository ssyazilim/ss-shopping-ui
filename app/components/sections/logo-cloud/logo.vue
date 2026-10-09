<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{
    logo: { image: string; imageDark: string; alt: string; link: string }
    start?: boolean
  }>(),
  {
    start: false,
  }
)

// DATA
const NuxtLink = resolveComponent("NuxtLink")

// COMPUTED
const external = computed(() => /^(https?:)?\/\//.test(props.logo.link || ""))
</script>

<template>
  <component
    :is="logo.link ? NuxtLink : 'div'"
    :to="logo.link || undefined"
    :target="logo.link && external ? '_blank' : undefined"
    class="block"
  >
    <img
      :src="logo.image"
      :alt="logo.alt"
      class="max-h-12 w-full object-contain"
      :class="[{ 'dark:hidden': logo.imageDark }, start ? 'object-left rtl:object-right' : 'object-center']"
    />
    <img
      v-if="logo.imageDark"
      :src="logo.imageDark"
      :alt="logo.alt"
      class="hidden max-h-12 w-full object-contain dark:block"
      :class="start ? 'object-left rtl:object-right' : 'object-center'"
    />
  </component>
</template>
