<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{
    image?: string
    alt?: string
    title?: string
    description?: string
    to?: string
    linkText?: string
  }>(),
  {
    image: "",
    alt: "",
    title: "",
    description: "",
    to: "",
    linkText: "",
  }
)

// COMPUTED
const button = computed(() => !!(props.to && props.linkText))
const hasText = computed(() => !!(props.title || props.description || button.value))
</script>

<template>
  <div
    class="relative isolate flex h-full min-h-[28rem] items-center justify-center overflow-hidden bg-gray-900 sm:min-h-[36rem]"
  >
    <img v-if="image" :src="image" :alt="alt" class="absolute inset-0 -z-10 size-full object-cover" />
    <!-- The overlay keeps the white text readable; a slide without text shows its photo as is -->
    <div v-if="image && hasText" class="absolute inset-0 -z-10 bg-gray-900/50" aria-hidden="true" />

    <div v-if="hasText" class="mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
      <h2 v-if="title" class="text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
        {{ title }}
      </h2>
      <p v-if="description" class="mt-6 text-pretty text-lg/8 text-gray-200 first:mt-0 sm:text-xl/8">
        {{ description }}
      </p>
      <div v-if="button" class="mt-10 flex justify-center first:mt-0">
        <form-elements-button :to="to" color="white" :text="linkText" />
      </div>
    </div>
  </div>
</template>
