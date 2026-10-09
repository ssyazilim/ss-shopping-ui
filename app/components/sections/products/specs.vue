<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    description?: string
    columns?: "1" | "2"
    reverse?: boolean
    specs?: { name: string; description: string }[]
    images?: { image: string; alt: string }[]
    isContent?: boolean
  }>(),
  {
    eyebrow: "",
    title: "",
    description: "",
    columns: "2",
    reverse: false,
    specs: () => [],
    images: () => [],
    isContent: false,
  }
)

// COMPUTED
const items = computed(() =>
  (Array.isArray(props.specs) ? props.specs : []).filter((spec) => spec?.name || spec?.description)
)
const photos = computed(() =>
  (Array.isArray(props.images) ? props.images : []).filter((photo) => photo?.image)
)
// With an odd number of photos the first one spans both columns: 1, 1 + 2, 1 + 4 ...
const odd = computed(() => photos.value.length % 2 === 1)
</script>

<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div
        class="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none"
        :class="{ 'lg:grid-cols-2': photos.length }"
      >
        <div>
          <p
            v-if="isContent ? $slots.eyebrow : eyebrow"
            class="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400"
          >
            <slot v-if="isContent" name="eyebrow" />
            <template v-else>{{ eyebrow }}</template>
          </p>
          <h2
            v-if="isContent ? $slots.title : title"
            class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 first:mt-0 sm:text-5xl dark:text-white"
          >
            <slot v-if="isContent" name="title" />
            <template v-else>{{ title }}</template>
          </h2>
          <p
            v-if="isContent ? $slots.default : description"
            class="mt-6 text-lg/8 text-gray-600 first:mt-0 dark:text-gray-300"
          >
            <slot v-if="isContent" />
            <template v-else>{{ description }}</template>
          </p>
          <dl
            v-if="items.length"
            class="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 first:mt-0 sm:gap-y-16 lg:gap-x-8"
            :class="{ 'sm:grid-cols-2': columns === '2' }"
          >
            <div
              v-for="(spec, i) in items"
              :key="i"
              class="border-t border-gray-200 pt-4 dark:border-white/10"
            >
              <dt class="font-semibold text-gray-900 dark:text-white">{{ spec.name }}</dt>
              <dd class="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">{{ spec.description }}</dd>
            </div>
          </dl>
        </div>

        <div
          v-if="photos.length"
          class="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
          :class="{ 'lg:order-first': reverse }"
        >
          <img
            v-for="(photo, i) in photos"
            :key="i"
            :src="photo.image"
            :alt="photo.alt"
            class="aspect-square w-full rounded-lg bg-gray-100 object-cover dark:bg-gray-800"
            :class="{ 'col-span-2': odd && i === 0 }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
