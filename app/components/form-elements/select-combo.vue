<script setup lang="ts">
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue"
import { ChevronUpDownIcon } from "@heroicons/vue/20/solid"
import type { IComboItem } from "@ssyazilim/ss-shopping-schemas"

// MODEL
const model = defineModel<string>({ default: "" })

// PROPS
const props = withDefaults(
  defineProps<{
    data?: IComboItem[]
    displayValue?: (item: IComboItem) => string
    searchOnly?: boolean
    uniqueId?: string
    formClass?: string
    labelTitle?: string
    labelClass?: string
    placeholder?: string
    validateError?: boolean
    validateMessage?: string
  }>(),
  {
    data: () => [],
    displayValue: (item: IComboItem) => item?.name ?? "",
    searchOnly: false,
    uniqueId: "",
    formClass: "",
    labelTitle: "",
    labelClass: "",
    placeholder: "",
    validateError: false,
    validateMessage: "",
  }
)

// DATA
const query = ref("")

// COMPUTED
const selectedItem = computed({
  get: () => props.data.find((item) => item.name === model.value) ?? null,
  set: (item: IComboItem | null) => {
    model.value = item?.name ?? ""
    query.value = ""
  },
})
const filteredData = computed(() => {
  const text = query.value.toLowerCase()
  if (!text) return props.searchOnly ? [] : props.data
  return props.data.filter((item) => props.displayValue(item).toLowerCase().includes(text))
})
</script>

<template>
  <Combobox v-model="selectedItem" as="div" nullable :class="[formClass, 'relative']">
    <ComboboxLabel
      v-if="labelTitle || $slots.helper"
      :class="[labelClass, 'block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50']"
    >
      {{ labelTitle }}
      <slot name="helper" />
    </ComboboxLabel>

    <div class="relative">
      <ComboboxInput
        :id="uniqueId"
        :display-value="(item) => (item ? displayValue(item as IComboItem) : '')"
        :placeholder="placeholder"
        autocomplete="off"
        class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-slate-800 dark:text-gray-50 dark:ring-gray-600 dark:focus:ring-indigo-300"
        @change="query = $event.target.value"
      />
      <ComboboxButton
        class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
      >
        <ChevronUpDownIcon class="size-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
      </ComboboxButton>

      <template v-if="validateError">
        <Icon
          name="heroicons-solid:x-mark"
          class="absolute right-8 top-0 h-full text-xl text-red-600 dark:text-red-300"
        />
        <span class="absolute left-1 text-xs text-red-600 dark:text-red-300">{{ validateMessage }}</span>
      </template>

      <ComboboxOptions
        v-if="filteredData.length > 0"
        class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm dark:bg-slate-800 dark:ring-white/5"
      >
        <ComboboxOption
          v-for="(item, index) in filteredData"
          :key="item._id ?? item.name ?? index"
          v-slot="{ active, selected }"
          :value="item"
          as="template"
        >
          <li
            :class="[
              'relative cursor-default select-none py-2 pl-3 pr-9',
              active
                ? 'bg-indigo-600 text-white dark:bg-indigo-300 dark:text-black'
                : 'text-gray-900 dark:text-gray-50',
            ]"
          >
            <span :class="['flex items-center gap-x-3 truncate', selected && 'font-semibold']">
              <slot name="option" :item="item">{{ displayValue(item) }}</slot>
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>
