<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    layout?: "stacked" | "side"
    align?: "start" | "center"
    variant?: "inline" | "avatar" | "circle" | "photo" | "row"
    columns?: "1" | "2" | "3" | "4" | "6"
    cards?: boolean
    background?: "none" | "blobs" | "grid" | "skew"
    people?: {
      name: string
      role: string
      image: string
      bio: string
      location: string
      icon: string
      link: string
    }[]
  }>(),
  {
    layout: "stacked",
    align: "start",
    variant: "photo",
    columns: "3",
    cards: false,
    background: "none",
    people: () => [],
  }
)

// DATA
const localePath = useLocalePath()

// COMPUTED
const items = computed(() =>
  (Array.isArray(props.people) ? props.people : []).map((person) => {
    const link = person?.link ?? ""
    return { ...person, link: link.startsWith("/") && !link.startsWith("//") ? localePath(link) : link }
  })
)
</script>

<template>
  <sections-team-main
    is-content
    :layout="layout"
    :align="align"
    :person-style="variant"
    :columns="columns"
    :cards="cards"
    :background="background"
    :people="items"
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
  </sections-team-main>
</template>
