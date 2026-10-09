<script setup lang="ts">
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue"
import type { IRadioItem } from "@ssyazilim/ss-shopping-schemas"

// EMITS
const emit = defineEmits(["update:modelValue", "update:selectedIndex"])

// PROPS
const props = withDefaults(
  defineProps<{
    data?: IRadioItem[]
    modelValue?: IRadioItem | null
    selectedIndex?: number
    formClass?: string
    labelTitle?: string
    labelDescription?: string
  }>(),
  {
    data: () => [],
    modelValue: null,
    selectedIndex: 0,
    formClass: "",
    labelTitle: "",
    labelDescription: "",
  }
)

// COMPUTED
const selectedId = computed({
  get: () => props.modelValue?._id ?? props.data[props.selectedIndex]?._id,
  set: (id) => {
    const index = props.data.findIndex((item) => item._id === id)
    emit("update:modelValue", props.data[index])
    emit("update:selectedIndex", index)
  },
})
</script>

<template>
  <RadioGroup v-model="selectedId" :class="[formClass, 'relative']">
    <RadioGroupLabel
      v-if="labelTitle"
      class="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
    >
      {{ labelTitle }}
    </RadioGroupLabel>
    <p v-if="labelDescription" class="text-sm text-gray-500 dark:text-gray-400">{{ labelDescription }}</p>
    <div class="relative mt-2 -space-y-px rounded-md bg-white dark:bg-slate-800">
      <RadioGroupOption
        v-for="(item, index) in data"
        v-slot="{ active, checked, disabled }"
        :key="item._id ?? index"
        as="template"
        :value="item._id"
        :disabled="item.disabled"
      >
        <div
          :class="[
            index === 0 ? 'rounded-t-md' : '',
            index === data.length - 1 ? 'rounded-b-md' : '',
            checked
              ? 'z-10 border-indigo-200 bg-indigo-50 dark:border-indigo-700 dark:bg-indigo-800'
              : 'border-gray-200 dark:border-gray-700',
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            'relative flex flex-wrap border p-4 focus:outline-none',
          ]"
        >
          <span
            :class="[
              checked
                ? 'border-transparent bg-indigo-600 dark:bg-indigo-300'
                : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-slate-800',
              active && !disabled ? 'ring-2 ring-indigo-600 ring-offset-2 dark:ring-indigo-300' : '',
              'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border',
            ]"
            aria-hidden="true"
          >
            <span class="size-1.5 rounded-full bg-white dark:bg-slate-800" />
          </span>
          <span class="ml-3 flex min-w-0 flex-1 flex-col">
            <RadioGroupLabel
              as="span"
              :class="[
                checked ? 'text-indigo-900 dark:text-indigo-50' : 'text-gray-900 dark:text-gray-50',
                'block text-sm font-medium',
              ]"
            >
              <slot name="label" :item="item" :checked="checked">{{ item.label }}</slot>
            </RadioGroupLabel>
            <RadioGroupDescription
              v-if="$slots.description || item.description"
              as="span"
              :class="[
                checked ? 'text-indigo-700 dark:text-indigo-200' : 'text-gray-500 dark:text-gray-400',
                'block text-sm',
              ]"
            >
              <slot name="description" :item="item" :checked="checked">{{ item.description }}</slot>
            </RadioGroupDescription>
          </span>
          <div v-if="$slots.content" class="w-full pl-7">
            <slot name="content" :item="item" :checked="checked" />
          </div>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
