<script setup lang="ts">
// MODEL
const model = defineModel<boolean>({ default: false })

// PROPS
withDefaults(
  defineProps<{
    uniqueId?: string
    formClass?: string
    labelTitle?: string
    disabled?: boolean
    validateError?: boolean
    validateMessage?: string
  }>(),
  {
    uniqueId: "",
    formClass: "",
    labelTitle: "",
    disabled: false,
    validateError: false,
    validateMessage: "",
  }
)
</script>

<template>
  <div :class="[formClass, 'relative flex items-center']">
    <input
      :id="uniqueId"
      v-model="model"
      :name="uniqueId"
      type="checkbox"
      :disabled="disabled"
      class="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-indigo-500 dark:focus:ring-indigo-300"
    />
    <label :for="uniqueId" class="ml-2 block text-sm leading-6 text-gray-900 dark:text-gray-50">
      {{ labelTitle }}
    </label>
    <span v-if="validateError" class="absolute left-0 top-full text-xs text-red-600 dark:text-red-300">
      {{ validateMessage }}
    </span>
  </div>
</template>
