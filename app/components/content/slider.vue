<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    slides?: {
      image: string
      alt: string
      title: string
      description: string
      to: string
      linktext: string
    }[]
    autoplay?: boolean
    loop?: boolean
    arrows?: "glass" | "plain" | "none"
    dots?: "dots" | "pill" | "progress" | "none"
    effect?: "slide" | "fade"
  }>(),
  {
    slides: () => [],
    autoplay: false,
    loop: false,
    arrows: "glass",
    dots: "dots",
    effect: "slide",
  }
)

// DATA
const localePath = useLocalePath()

// COMPUTED
const items = computed(() =>
  (Array.isArray(props.slides) ? props.slides : [])
    .filter((slide) => slide)
    .map((slide) => {
      const to = slide.to ?? ""
      return {
        image: slide.image ?? "",
        alt: slide.alt ?? "",
        title: slide.title ?? "",
        description: slide.description ?? "",
        to: to.startsWith("/") ? localePath(to) : to,
        linkText: slide.linktext ?? "",
      }
    })
)
</script>

<template>
  <data-displays-slider
    :items="items"
    :autoplay="autoplay"
    :loop="loop"
    :arrows="arrows !== 'none'"
    :arrow-style="arrows === 'none' ? undefined : arrows"
    :dots="dots !== 'none'"
    :dot-style="dots === 'none' ? undefined : dots"
    :effect="effect"
  >
    <template #default="{ item }">
      <sections-slider-slide v-bind="item" />
    </template>
  </data-displays-slider>
</template>
