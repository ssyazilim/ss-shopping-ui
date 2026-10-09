<script setup lang="ts">
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/20/solid"
import type { IInputType, IInputMode } from "@ssyazilim/ss-shopping-schemas"

// EMITS
const emit = defineEmits(["update:modelValue"])

// PROPS
const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    isNumber?: boolean
    uniqueId?: string
    type?: IInputType
    inputMode?: IInputMode
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    autocomplete?: string
    minlength?: string
    maxlength?: string
    formClass?: string
    labelTitle?: string
    labelClass?: string
    inputClass?: string
    validateError?: boolean
    validateMessage?: string
    activeValidate?: boolean
    showPasswordToggle?: boolean
  }>(),
  {
    modelValue: "",
    isNumber: false,
    uniqueId: "",
    type: "text",
    inputMode: undefined,
    placeholder: "",
    disabled: false,
    readonly: false,
    autocomplete: undefined,
    minlength: undefined,
    maxlength: undefined,
    formClass: "",
    labelTitle: "",
    labelClass: "",
    inputClass: "",
    validateError: false,
    validateMessage: "",
    activeValidate: true,
    showPasswordToggle: false,
  }
)

// DATA
const revealed = ref(false)

// COMPUTED
const hasPasswordToggle = computed(() => props.showPasswordToggle && props.type === "password")
const inputType = computed(() => {
  if (!hasPasswordToggle.value) return props.type
  return revealed.value ? "text" : "password"
})

// METHODS
const handleInputEvent = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit("update:modelValue", target.value)
}
</script>

<template>
  <div :class="[formClass, 'relative rounded-md shadow-sm']">
    <label
      :for="uniqueId"
      :class="[
        labelClass,
        'flex items-center justify-between text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100',
      ]"
    >
      <span v-if="labelTitle">{{ labelTitle }} {{ activeValidate ? "*" : "" }}</span>
      <slot name="helper" />
    </label>
    <div class="flex grow items-stretch focus-within:z-10">
      <slot name="select" />
      <input
        :id="uniqueId"
        v-only-number="isNumber"
        :name="uniqueId"
        :type="inputType"
        :inputmode="inputMode"
        :value="modelValue"
        :placeholder="placeholder"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :minlength="minlength"
        :maxlength="maxlength"
        :class="[
          disabled
            ? 'cursor-not-allowed bg-gray-200 dark:bg-gray-700'
            : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-700 dark:text-gray-50 dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-300',
          inputClass,
          hasPasswordToggle ? 'pr-10' : '',
          'block w-full rounded-md border-0 px-3.5 py-2 shadow-sm sm:text-sm sm:leading-6',
        ]"
        @input="handleInputEvent"
      />
      <button
        v-if="hasPasswordToggle"
        type="button"
        tabindex="-1"
        :class="[
          validateError && activeValidate ? 'right-8' : 'right-2',
          labelTitle ? 'mt-6' : '',
          'absolute inset-y-0 flex items-center text-indigo-600 hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-400',
        ]"
        @click="revealed = !revealed"
      >
        <span class="sr-only">{{ labelTitle }}</span>
        <EyeIcon v-if="!revealed" class="size-5" aria-hidden="true" />
        <EyeSlashIcon v-else class="size-5" aria-hidden="true" />
      </button>
      <slot name="button" />
    </div>
    <template v-if="activeValidate && validateError">
      <Icon
        name="heroicons-solid:x-mark"
        :class="[
          labelTitle ? 'top-3' : 'top-0',
          'absolute right-1 h-full text-xl text-red-600 dark:text-red-300',
        ]"
      />
      <span class="absolute left-1 text-xs text-red-600 dark:text-red-300">{{ validateMessage }}</span>
    </template>
  </div>
</template>
