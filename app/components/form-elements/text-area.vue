<script setup lang="ts">
// MODEL
const model = defineModel<string>({ default: "" })

// PROPS
withDefaults(
  defineProps<{
    uniqueId?: string
    rows?: string
    placeholder?: string
    disabled?: boolean
    formClass?: string
    labelTitle?: string
    labelClass?: string
    inputClass?: string
    validateError?: boolean
    validateMessage?: string
    activeValidate?: boolean
  }>(),
  {
    uniqueId: "",
    rows: "4",
    placeholder: "",
    disabled: false,
    formClass: "",
    labelTitle: "",
    labelClass: "",
    inputClass: "",
    validateError: false,
    validateMessage: "",
    activeValidate: true,
  }
)
</script>

<template>
  <div :class="[formClass, 'relative']">
    <label
      v-if="labelTitle || $slots.helper"
      :for="uniqueId"
      :class="[labelClass, 'block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100']"
    >
      {{ labelTitle }} {{ labelTitle && activeValidate ? "*" : "" }}
      <slot name="helper" />
    </label>
    <div class="relative mt-2 rounded-md shadow-sm">
      <textarea
        :id="uniqueId"
        v-model="model"
        :name="uniqueId"
        :rows="rows"
        :disabled="disabled"
        :placeholder="placeholder"
        :class="[
          disabled
            ? 'cursor-not-allowed bg-gray-200 dark:bg-gray-700'
            : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-700 dark:text-gray-50 dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-300',
          inputClass,
          'block w-full rounded-md border-0 px-3.5 py-2 shadow-sm sm:text-sm sm:leading-6',
        ]"
      />
      <template v-if="activeValidate && validateError">
        <Icon
          name="heroicons-solid:x-mark"
          class="absolute right-2 top-0 h-full text-xl text-red-600 dark:text-red-300"
        />
        <span class="absolute left-1 text-xs text-red-600 dark:text-red-300">{{ validateMessage }}</span>
      </template>
    </div>
  </div>
</template>
