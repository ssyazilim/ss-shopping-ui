<script setup lang="ts">
// PROPS
withDefaults(
  defineProps<{
    title?: string
    description?: string
    details?: string
    images?: string[]
    isContent?: boolean
  }>(),
  {
    title: "",
    description: "",
    details: "",
    images: () => [],
    isContent: false,
  }
)
</script>

<template>
  <div class="overflow-hidden py-32">
    <div class="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
      <div
        class="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8"
      >
        <div class="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
          <h2
            v-if="isContent ? $slots.title : title"
            class="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white"
          >
            <slot v-if="isContent" name="title" />
            <template v-else>{{ title }}</template>
          </h2>
          <p
            v-if="isContent ? $slots.default : description"
            class="mt-6 text-xl/8 text-gray-700 dark:text-gray-300"
          >
            <slot v-if="isContent" />
            <template v-else>{{ description }}</template>
          </p>
          <p
            v-if="isContent ? $slots.details : details"
            class="mt-6 text-base/7 text-gray-600 dark:text-gray-400"
          >
            <slot v-if="isContent" name="details" />
            <template v-else>{{ details }}</template>
          </p>
          <div
            v-if="$slots.links"
            class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 text-gray-900 dark:text-white"
          >
            <slot name="links" />
          </div>
        </div>
        <div
          v-if="images.some(Boolean)"
          class="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents"
        >
          <div v-if="images[0]" class="w-0 flex-auto lg:ms-auto lg:w-auto lg:flex-none lg:self-end">
            <img
              :src="images[0]"
              alt=""
              class="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover max-sm:w-[30rem] dark:bg-gray-800"
            />
          </div>
          <div
            class="contents lg:col-span-2 lg:col-end-2 lg:ms-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8"
          >
            <div
              v-if="images[1]"
              class="order-first flex w-64 flex-none justify-end self-end max-sm:w-40 lg:w-auto"
            >
              <img
                :src="images[1]"
                alt=""
                class="aspect-[4/3] w-96 max-w-none flex-none rounded-2xl bg-gray-50 object-cover dark:bg-gray-800"
              />
            </div>
            <div v-if="images[2]" class="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
              <img
                :src="images[2]"
                alt=""
                class="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover max-sm:w-[30rem] dark:bg-gray-800"
              />
            </div>
            <div v-if="images[3]" class="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
              <img
                :src="images[3]"
                alt=""
                class="aspect-[4/3] w-96 max-w-none rounded-2xl bg-gray-50 object-cover dark:bg-gray-800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
