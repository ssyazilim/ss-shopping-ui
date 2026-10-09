<script setup lang="ts">
// EMITS
const emit = defineEmits(["update:modelValue"])

// PROPS
const props = withDefaults(
  defineProps<{
    data?: { name?: string; code?: string; [key: string]: any }[]
    modelValue?: string
    type?: "default" | "translation" | "category" | "sort"
    uniqueId?: string
    formClass?: string
    placeholder?: string
    disabled?: boolean
    labelTitle?: string
    labelClass?: string
    validateError?: boolean
    validateMessage?: string
    activeValidate?: boolean
  }>(),
  {
    data: () => [],
    modelValue: "",
    type: "default",
    uniqueId: "",
    formClass: "",
    placeholder: "",
    disabled: false,
    labelTitle: "",
    labelClass: "",
    validateError: false,
    validateMessage: "",
    activeValidate: true,
  }
)

// DATA
const { t } = useLang()

// METHODS
const getDisplayText = (item: { name?: string; code?: string; [key: string]: any }) => {
  if (props.type === "translation") return item?.code
  if (props.type === "sort") return t(item?.name ?? "")
  return item?.name
}
const handleInputEvent = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLSelectElement).value)
}
</script>

<template>
  <div :class="[formClass, 'relative']">
    <label
      v-if="labelTitle || $slots.helper"
      :for="uniqueId"
      :class="[labelClass, 'block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50']"
    >
      {{ labelTitle }} {{ labelTitle && activeValidate ? "*" : "" }}
      <slot name="helper" />
    </label>

    <select
      :id="uniqueId"
      :name="uniqueId"
      :value="modelValue"
      :disabled="disabled"
      :class="[
        disabled
          ? 'cursor-not-allowed bg-gray-200 dark:bg-gray-700'
          : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-700 dark:text-gray-50 dark:ring-gray-600 dark:focus:ring-indigo-300',
        'block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-base shadow-sm sm:text-sm sm:leading-6',
      ]"
      @input="handleInputEvent"
    >
      <option v-if="placeholder" :value="''" disabled>{{ placeholder }}</option>
      <option v-for="(item, index) in data" :key="index" :value="JSON.stringify(item)">
        {{ getDisplayText(item) }}
      </option>
    </select>

    <template v-if="activeValidate && validateError">
      <Icon
        name="heroicons-solid:x-mark"
        class="absolute right-8 top-3 h-full text-xl text-red-600 dark:text-red-300"
      />
      <span class="absolute left-1 text-xs text-red-600 dark:text-red-300">{{ validateMessage }}</span>
    </template>
  </div>
</template>
