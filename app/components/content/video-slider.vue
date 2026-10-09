<script setup lang="ts">
import { Comment, Fragment, Text } from "vue"
import type { VNode } from "vue"

withDefaults(
  defineProps<{
    align?: "start" | "center"
    effect?: "slide" | "coverflow" | "cards"
    arrows?: "glass" | "plain" | "none"
    dots?: "dots" | "pill" | "progress" | "none"
  }>(),
  {
    align: "start",
    effect: "slide",
    arrows: "glass",
    dots: "dots",
  }
)

// DATA
const slots = useSlots()

// METHODS
// Every block placed inside (a video card) becomes one slide; text and blank lines between them are dropped
const blocks = (nodes: VNode[]): VNode[] =>
  nodes.flatMap((node) => {
    if (node.type === Comment || node.type === Text) return []
    // Fragments and elements, such as the paragraph MDC puts around an inline component, are looked through
    if (node.type === Fragment || typeof node.type === "string")
      return Array.isArray(node.children) ? blocks(node.children as VNode[]) : []
    return [node]
  })
// Called while rendering, so the cards follow every edit
const cards = () => blocks(slots.default?.() ?? [])
</script>

<template>
  <sections-videos-main
    is-content
    :align="align"
    :effect="effect"
    :arrows="arrows"
    :dots="dots"
    :cards="cards()"
  >
    <template v-if="$slots.eyebrow" #eyebrow>
      <slot name="eyebrow" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.title" #title>
      <slot name="title" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.description" #description>
      <slot name="description" mdc-unwrap="p" />
    </template>
  </sections-videos-main>
</template>
