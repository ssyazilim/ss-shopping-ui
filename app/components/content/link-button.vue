<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to?: string
    color?: "indigo" | "violet" | "sky" | "green" | "lime" | "yellow" | "red" | "slate" | "stone" | "white"
    icon?: string
    variant?: "solid" | "link"
    iconafter?: boolean
  }>(),
  {
    to: "",
    color: "indigo",
    icon: "",
    variant: "solid",
    iconafter: false,
  }
)

// DATA
const localePath = useLocalePath()

// COMPUTED
const link = computed(() => (props.to.startsWith("/") ? localePath(props.to) : props.to))
</script>

<template>
  <form-elements-button
    is-content
    :to="link || undefined"
    :color="color"
    :variant="variant"
    :icon-after="iconafter"
  >
    <template v-if="icon" #icon>
      <Icon :name="icon" class="size-5" />
    </template>
    <slot mdc-unwrap="p" />
  </form-elements-button>
</template>
