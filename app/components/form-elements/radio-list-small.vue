<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue"
import type { IRadioTile } from "@ssyazilim/ss-shopping-schemas"

// MODEL
const model = defineModel<string>({ default: "" })

// PROPS
withDefaults(
  defineProps<{
    data?: IRadioTile[]
    formClass?: string
    gridClass?: string
    labelTitle?: string
  }>(),
  {
    data: () => [],
    formClass: "",
    gridClass: "grid-cols-3",
    labelTitle: "",
  }
)
</script>

<template>
  <RadioGroup v-model="model" :class="formClass">
    <RadioGroupLabel
      v-if="labelTitle"
      class="block pb-1 text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
    >
      {{ labelTitle }}
    </RadioGroupLabel>
    <div :class="[gridClass, 'grid gap-3 pb-3']">
      <RadioGroupOption
        v-for="item in data"
        :key="item.name"
        v-slot="{ active, checked, disabled }"
        as="template"
        :value="item.name"
        :disabled="item.disabled"
      >
        <div
          :class="[
            active ? 'ring-2 ring-indigo-600 ring-offset-2 dark:ring-indigo-300' : '',
            checked
              ? 'bg-indigo-600 text-white hover:bg-indigo-500 dark:bg-indigo-300 dark:text-black dark:hover:bg-indigo-400'
              : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-slate-800 dark:text-gray-50 dark:ring-gray-600 dark:hover:bg-gray-900',
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            'flex items-center justify-center rounded-md p-3 text-sm font-semibold sm:flex-1',
          ]"
        >
          <slot :item="item" :checked="checked">{{ item.name }}</slot>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
