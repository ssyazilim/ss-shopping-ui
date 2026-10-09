<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid"

// MODEL
const model = defineModel<string>({ default: "" })

// PROPS
withDefaults(
  defineProps<{
    uniqueId?: string
    labelTitle?: string
    placeholder?: string
    readonly?: boolean
    formClass?: string
    inputClass?: string
  }>(),
  {
    uniqueId: "",
    labelTitle: "...",
    placeholder: "",
    readonly: false,
    formClass: "",
    inputClass: "dark:bg-slate-800",
  }
)
</script>

<template>
  <div :class="[formClass, 'flex flex-1']">
    <form class="flex w-full" role="search" @submit.prevent>
      <label :for="uniqueId" class="sr-only">{{ labelTitle }}</label>
      <div
        class="relative w-full text-gray-400 focus-within:text-gray-600 dark:text-gray-500 dark:focus-within:text-gray-300"
      >
        <div class="pointer-events-none absolute inset-y-0 left-2 flex items-center">
          <MagnifyingGlassIcon class="size-5 shrink-0 text-gray-400 dark:text-gray-500" aria-hidden="true" />
        </div>
        <input
          :id="uniqueId"
          v-model="model"
          :name="uniqueId"
          type="text"
          inputmode="search"
          :placeholder="placeholder"
          :readonly="readonly"
          :class="[
            inputClass,
            'block size-full border-transparent py-2 pl-8 pr-3 text-base focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm',
          ]"
        />
      </div>
    </form>
  </div>
</template>
