<script setup lang="ts">
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/vue/24/outline"

// PROPS
const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    layout?: "side" | "accordion" | "rows" | "grid"
    columns?: "2" | "3"
    align?: "start" | "center"
    background?: "none" | "blobs" | "grid" | "skew"
    faqs?: { question: string; answer: string }[]
    isContent?: boolean
  }>(),
  {
    title: "",
    description: "",
    layout: "side",
    columns: "3",
    align: "start",
    background: "none",
    faqs: () => [],
    isContent: false,
  }
)

// METHODS
const slots = useSlots()
const hasHeading = () =>
  props.isContent ? !!(slots.title || slots.default) : !!(props.title || props.description)

// COMPUTED
const items = computed(() => (Array.isArray(props.faqs) ? props.faqs : []).filter((faq) => faq?.question))
const side = computed(() => props.layout === "side")
const centered = computed(() => props.align === "center")
</script>

<template>
  <div class="relative isolate overflow-hidden py-24 sm:py-32">
    <sections-decorations-blobs v-if="background === 'blobs'" />
    <sections-decorations-grid v-else-if="background === 'grid'" />
    <sections-decorations-skew v-else-if="background === 'skew'" />

    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div
        :class="{
          'lg:grid lg:grid-cols-12 lg:gap-8': side,
          'mx-auto max-w-4xl': layout === 'accordion',
        }"
      >
        <!-- heading -->
        <div
          v-if="hasHeading()"
          :class="[
            side ? 'lg:col-span-5' : 'max-w-2xl',
            {
              'mx-auto text-center': centered,
              'mx-auto lg:mx-0': !centered && !side && layout !== 'accordion',
            },
          ]"
        >
          <h2
            v-if="isContent ? $slots.title : title"
            class="text-pretty font-semibold tracking-tight text-gray-900 dark:text-white"
            :class="side ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl'"
          >
            <slot v-if="isContent" name="title" />
            <template v-else>{{ title }}</template>
          </h2>
          <!-- The description may hold a link, e.g. to customer support -->
          <p
            v-if="isContent ? $slots.default : description"
            class="text-pretty text-base/7 text-gray-600 first:mt-0 dark:text-gray-400 [&_a]:font-semibold [&_a]:text-indigo-600 hover:[&_a]:text-indigo-500 dark:[&_a]:text-indigo-400 dark:hover:[&_a]:text-indigo-300"
            :class="side ? 'mt-4' : 'mt-6'"
          >
            <slot v-if="isContent" />
            <template v-else>{{ description }}</template>
          </p>
        </div>

        <!-- side: questions stacked in the right column -->
        <dl v-if="side && items.length" class="mt-10 space-y-10 first:mt-0 lg:col-span-7 lg:mt-0">
          <div v-for="(faq, i) in items" :key="i">
            <dt class="text-base/7 font-semibold text-gray-900 dark:text-white">{{ faq.question }}</dt>
            <dd class="mt-2 text-base/7 text-gray-600 dark:text-gray-400">{{ faq.answer }}</dd>
          </div>
        </dl>

        <!-- accordion: native details/summary, no script needed -->
        <div
          v-else-if="layout === 'accordion' && items.length"
          class="mt-16 divide-y divide-gray-900/10 first:mt-0 dark:divide-white/10"
        >
          <details v-for="(faq, i) in items" :key="i" class="group py-6 first:pt-0 last:pb-0">
            <summary
              class="flex w-full cursor-pointer list-none items-start justify-between text-start text-gray-900 dark:text-white [&::-webkit-details-marker]:hidden"
            >
              <span class="text-base/7 font-semibold">{{ faq.question }}</span>
              <span class="ms-6 flex h-7 items-center">
                <PlusSmallIcon class="size-6 group-open:hidden" aria-hidden="true" />
                <MinusSmallIcon class="hidden size-6 group-open:block" aria-hidden="true" />
              </span>
            </summary>
            <p class="mt-2 pe-12 text-base/7 text-gray-600 dark:text-gray-400">{{ faq.answer }}</p>
          </details>
        </div>

        <!-- rows: question on the left, answer on the right -->
        <dl
          v-else-if="layout === 'rows' && items.length"
          class="mt-20 divide-y divide-gray-900/10 first:mt-0 dark:divide-white/10"
        >
          <div
            v-for="(faq, i) in items"
            :key="i"
            class="py-8 first:pt-0 last:pb-0 lg:grid lg:grid-cols-12 lg:gap-8"
          >
            <dt class="text-base/7 font-semibold text-gray-900 lg:col-span-5 dark:text-white">
              {{ faq.question }}
            </dt>
            <dd class="mt-4 text-base/7 text-gray-600 lg:col-span-7 lg:mt-0 dark:text-gray-400">
              {{ faq.answer }}
            </dd>
          </div>
        </dl>

        <!-- grid -->
        <dl
          v-else-if="layout === 'grid' && items.length"
          class="mt-20 space-y-16 first:mt-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:gap-x-10"
          :class="{ 'lg:grid-cols-3': columns === '3' }"
        >
          <div v-for="(faq, i) in items" :key="i">
            <dt class="text-base/7 font-semibold text-gray-900 dark:text-white">{{ faq.question }}</dt>
            <dd class="mt-2 text-base/7 text-gray-600 dark:text-gray-400">{{ faq.answer }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
