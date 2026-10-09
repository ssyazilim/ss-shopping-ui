<script setup lang="ts">
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from "@headlessui/vue"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid"

// TYPES
type ISelectType = "default" | "language" | "phoneCode" | "dealer"

// EMITS
const emit = defineEmits(["update:modelValue"])

// PROPS
const props = withDefaults(
  defineProps<{
    data?: { name?: string; [key: string]: any }[]
    modelValue?: string | number
    type?: ISelectType
    labelTitle?: string
    hideLabel?: boolean
    inputClass?: string
    disabled?: boolean
  }>(),
  {
    data: () => [],
    modelValue: "",
    type: "default",
    labelTitle: "",
    hideLabel: false,
    inputClass:
      "bg-white text-gray-900 ring-gray-300 focus:ring-indigo-600 dark:bg-slate-700 dark:text-gray-50 dark:ring-gray-600 dark:focus:ring-indigo-300",
    disabled: false,
  }
)

// DATA
const selectedName = ref(props.modelValue)
const FLAG_CODES: Record<string, string> = { ar: "sa" }
const flagCode = (code?: string) => (code ? (FLAG_CODES[code] ?? code) : "")

// COMPUTED
const selectedData = computed(() => props.data.find((i) => i?.name === selectedName.value))

// WATCH
watch(selectedName, (name) => emit("update:modelValue", name))
watch(
  () => props.modelValue,
  (value) => {
    if (value !== selectedName.value) selectedName.value = value
  }
)
</script>

<template>
  <Listbox v-model="selectedName" as="div" :disabled="disabled">
    <ListboxLabel
      v-if="labelTitle"
      :class="hideLabel ? 'sr-only' : 'block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50'"
    >
      {{ labelTitle }}
    </ListboxLabel>
    <div class="relative">
      <ListboxButton
        :class="[
          inputClass,
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-default',
          'w-full rounded-md py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 sm:text-sm sm:leading-6',
        ]"
      >
        <span v-if="type === 'default'" class="block truncate">{{ selectedName }}</span>
        <span v-if="type === 'language'" class="flex items-center">
          <Icon class="size-6" :name="`circle-flags:${flagCode(selectedData?.code)}`" />
        </span>
        <span v-if="type === 'phoneCode'" class="flex items-center">
          <Icon class="size-6" :name="`flag:${selectedData?.iso2?.toLowerCase() || 'tr'}-1x1`" />
        </span>
        <span v-if="type === 'dealer'" class="flex items-center gap-3 pr-6">
          <img
            v-if="selectedData?.logo"
            :src="selectedData.logo"
            :alt="selectedData.name"
            class="size-5 shrink-0 rounded-full bg-gray-100 object-contain dark:bg-gray-700 dark:outline dark:outline-1 dark:-outline-offset-1 dark:outline-white/10"
          />
          <span class="block truncate">{{ selectedData?.name }}</span>
        </span>

        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="size-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          :class="[
            type === 'phoneCode' ? 'w-72' : 'w-full',
            'absolute z-50 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm dark:bg-slate-700 dark:ring-white/5',
          ]"
        >
          <ListboxOption
            v-for="(option, index) in data"
            :key="index"
            v-slot="{ active, selected }"
            as="template"
            :value="option?.name"
          >
            <li
              :class="[
                active
                  ? 'bg-indigo-600 text-white dark:bg-indigo-300 dark:text-black'
                  : 'text-gray-900 dark:text-gray-50',
                'relative cursor-default select-none py-2 pl-3 pr-9',
              ]"
            >
              <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                <span v-if="type === 'default'">{{ option.name }}</span>
                <span v-if="type === 'language'" class="flex items-center">
                  <Icon class="size-6" :name="`circle-flags:${flagCode(option.code)}`" />
                </span>
                <span v-if="type === 'phoneCode'" class="flex items-center text-xs">
                  <span>{{ option.emoji }}</span>
                  <span class="ml-1 truncate">{{ option.name }}</span>
                  <span class="ml-1">+{{ option.phonecode }}</span>
                </span>
                <span v-if="type === 'dealer'" class="flex items-center">
                  <img
                    :src="option.logo"
                    :alt="option.name"
                    class="size-5 rounded-full object-contain dark:outline dark:outline-1 dark:-outline-offset-1 dark:outline-white/10"
                  />
                  <span class="ml-3 block truncate">{{ option.name }}</span>
                </span>
              </span>
              <span
                v-if="selected"
                :class="[
                  active ? 'text-white dark:text-black' : 'text-indigo-600 dark:text-indigo-300',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <CheckIcon class="size-3" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
