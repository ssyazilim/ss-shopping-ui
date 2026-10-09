<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{
    features?: { name: string; description: string; icon?: string; to?: string; linkText?: string }[]
    itemStyle?: "inline" | "stacked" | "box-top" | "box-side"
  }>(),
  {
    features: () => [],
    itemStyle: "inline",
  }
)

// DATA
const box = "flex size-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500"

// COMPUTED
const items = computed(() => (Array.isArray(props.features) ? props.features : []))
const hasIcons = computed(() => items.value.some((feature) => feature?.icon))
const inline = computed(() => props.itemStyle === "inline")
const classes = computed(() => {
  switch (props.itemStyle) {
    case "box-top":
      return { item: "flex flex-col", description: "mt-1 flex-auto" }
    case "box-side":
      return { item: ["flex flex-col", { "relative ps-16": hasIcons.value }], description: "mt-2 flex-auto" }
    case "stacked":
      return { item: ["flex flex-col", { "relative ps-9": hasIcons.value }], description: "mt-1 flex-auto" }
    default:
      return { item: { "relative ps-9": hasIcons.value }, description: "inline" }
  }
})
</script>

<template>
  <dl v-if="items.length" class="text-base/7 text-gray-600 dark:text-gray-400">
    <div v-for="(feature, i) in items" :key="i" :class="classes.item">
      <dt class="font-semibold text-gray-900 dark:text-white" :class="{ inline }">
        <template v-if="feature.icon">
          <div v-if="itemStyle === 'box-top'" class="mb-6" :class="box">
            <Icon :name="feature.icon" class="size-6 text-white" aria-hidden="true" />
          </div>
          <div v-else-if="itemStyle === 'box-side'" class="absolute start-0 top-0" :class="box">
            <Icon :name="feature.icon" class="size-6 text-white" aria-hidden="true" />
          </div>
          <Icon
            v-else
            :name="feature.icon"
            class="absolute start-1 top-1 size-5 text-indigo-600 dark:text-indigo-400"
            aria-hidden="true"
          />
        </template>
        {{ feature.name }}
      </dt>
      <template v-if="inline">{{ " " }}</template>
      <dd :class="classes.description">{{ feature.description }}</dd>
      <dd v-if="feature.to && feature.linkText" class="mt-6">
        <NuxtLink
          :to="feature.to"
          class="text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          {{ feature.linkText }} <span aria-hidden="true" class="inline-block rtl:rotate-180">→</span>
        </NuxtLink>
      </dd>
    </div>
  </dl>
</template>
