<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue"

// MODEL
const model = defineModel<boolean>({ default: false })

// PROPS
withDefaults(
  defineProps<{
    uniqueId?: string
    formClass?: string
    labelTitle?: string
    labelLink?: string
    disabled?: boolean
  }>(),
  {
    uniqueId: "",
    formClass: "",
    labelTitle: "",
    labelLink: "",
    disabled: false,
  }
)
</script>

<template>
  <SwitchGroup as="div" :class="[formClass, 'flex items-center gap-x-4 p-2']">
    <Switch
      :id="uniqueId"
      v-model="model"
      :name="uniqueId"
      :disabled="disabled"
      :class="[
        model ? 'bg-indigo-600 dark:bg-indigo-300' : 'bg-gray-200 dark:bg-gray-700',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        'flex w-11 flex-none rounded-full p-0.5 ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:ring-gray-50/5 dark:focus-visible:outline-indigo-300',
      ]"
    >
      <span
        aria-hidden="true"
        :class="[
          model ? 'translate-x-5' : 'translate-x-0',
          'relative size-5 rounded-full bg-white shadow-md ring-1 ring-gray-900/5 transition duration-200 ease-in-out',
        ]"
      >
        <span
          :class="[
            model ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
            'absolute inset-0 flex size-full items-center justify-center transition-opacity',
          ]"
        >
          <svg class="size-3 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 12 12">
            <path
              d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <span
          :class="[
            model ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
            'absolute inset-0 flex size-full items-center justify-center transition-opacity',
          ]"
        >
          <svg class="size-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
            <path
              d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
            />
          </svg>
        </span>
      </span>
    </Switch>
    <SwitchLabel
      v-if="labelTitle || labelLink"
      :passive="disabled"
      :class="[
        'text-sm leading-6',
        disabled ? 'cursor-not-allowed text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-gray-50',
      ]"
    >
      {{ labelTitle }}
      <span v-if="labelLink" class="text-xs text-gray-500 dark:text-gray-400">{{ labelLink }}</span>
    </SwitchLabel>
  </SwitchGroup>
</template>
