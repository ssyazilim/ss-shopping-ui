<script setup lang="ts">
import type { ICountry } from "@ssyazilim/ss-shopping-schemas"

// EMITS
const emit = defineEmits(["update:modelValue"])

// PROPS
const props = withDefaults(
  defineProps<{
    modelValue?: string
    data?: ICountry[]
    uniqueId?: string
    countryLabel?: string
    formClass?: string
    labelTitle?: string
    disabled?: boolean
    validateError?: boolean
    validateMessage?: string
    activeValidate?: boolean
  }>(),
  {
    modelValue: "",
    data: () => [],
    uniqueId: "",
    countryLabel: "Country",
    formClass: "",
    labelTitle: "",
    disabled: false,
    validateError: false,
    validateMessage: "",
    activeValidate: true,
  }
)

// DATA
const pickedCountry = ref<ICountry | null>(null)

// COMPUTED
const sortedData = computed(() => [...props.data].sort((a, b) => b.phonecode.length - a.phonecode.length))
const country = computed(() => {
  const phone = props.modelValue || ""
  if (!phone) return props.data.find((c) => c.name === "Turkey") || null
  if (pickedCountry.value && phone.startsWith(`+${pickedCountry.value.phonecode}`)) return pickedCountry.value
  return sortedData.value.find((c) => phone.startsWith(`+${c.phonecode}`)) || null
})
const dialCode = computed(() => (country.value ? `+${country.value.phonecode}` : ""))
const localNumber = computed({
  get: () => (props.modelValue || "").slice(dialCode.value.length),
  set: (val: string) => emit("update:modelValue", `${dialCode.value}${val.replace(/\D/g, "")}`),
})
const selectedCountry = computed({
  get: () => country.value?.name || "Turkey",
  set: (name: string) => {
    const selected = props.data.find((c) => c.name === name) || null
    pickedCountry.value = selected
    emit("update:modelValue", `+${selected?.phonecode ?? ""}${localNumber.value}`)
  },
})
</script>

<template>
  <form-elements-default
    v-model="localNumber"
    :unique-id="uniqueId"
    :type="'tel'"
    :autocomplete="'tel-national'"
    :disabled="disabled"
    :form-class="formClass"
    :input-class="'pl-32'"
    :label-title="labelTitle"
    :active-validate="activeValidate"
    :validate-error="validateError"
    :validate-message="validateMessage"
    @beforeinput="(e: InputEvent) => (e.data && !/^\d+$/.test(e.data) ? e.preventDefault() : e)"
  >
    <template #select>
      <div class="absolute inset-y-0 left-0 mt-6 flex items-center">
        <form-elements-select-check
          v-model="selectedCountry"
          :type="'phoneCode'"
          :data="data"
          :label-title="countryLabel"
          hide-label
          :disabled="disabled"
        />
        <span class="pointer-events-none select-none px-1 text-sm text-gray-400 dark:text-gray-500">
          {{ dialCode }}
        </span>
      </div>
    </template>
  </form-elements-default>
</template>
