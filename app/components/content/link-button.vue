<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to?: string
    color?: "indigo" | "violet" | "sky" | "green" | "lime" | "yellow" | "red" | "slate" | "stone"
    icon?: string
    iconAfter?: boolean
  }>(),
  {
    to: "",
    color: "indigo",
    icon: "",
    iconAfter: false,
  }
)

// DATA
const localePath = useLocalePath()

// COMPUTED
const link = computed(() => (props.to.startsWith("/") ? localePath(props.to) : props.to))
</script>

<template>
  <form-elements-button is-content :to="link || undefined" :color="color" :icon-after="iconAfter">
    <template v-if="icon" #icon>
      <Icon :name="icon" class="size-5" />
    </template>
    <slot mdc-unwrap="p" />
  </form-elements-button>
</template>
