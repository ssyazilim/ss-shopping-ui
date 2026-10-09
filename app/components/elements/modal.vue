<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue"
import { XMarkIcon } from "@heroicons/vue/24/outline"
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/vue/20/solid"

// EMITS
const emit = defineEmits(["update:show-modal", "update:ok-button"])

// PROPS
const props = withDefaults(
  defineProps<{
    show?: boolean
    showCancelButton?: boolean
    showOkButton?: boolean
    lockCloseEvent?: boolean
    modalSize?: string
    title?: string
    text?: string
    type?: "" | "danger" | "success" | "info" | "warning"
    okText?: string
    cancelText?: string
  }>(),
  {
    show: false,
    showCancelButton: true,
    showOkButton: true,
    lockCloseEvent: false,
    modalSize: "lg:max-w-2xl",
    title: "",
    text: "",
    type: "",
    okText: "OK",
    cancelText: "Cancel",
  }
)

// DATA
const styles = {
  danger: {
    icon: XCircleIcon,
    circle: "bg-red-100 dark:bg-red-800",
    iconClass: "text-red-400 dark:text-red-500",
    button: "bg-red-600 hover:bg-red-500 dark:bg-red-300 dark:hover:bg-red-400",
  },
  success: {
    icon: CheckCircleIcon,
    circle: "bg-green-100 dark:bg-green-800",
    iconClass: "text-green-400 dark:text-green-500",
    button: "bg-green-600 hover:bg-green-500 dark:bg-green-300 dark:hover:bg-green-400",
  },
  info: {
    icon: InformationCircleIcon,
    circle: "bg-indigo-100 dark:bg-indigo-800",
    iconClass: "text-indigo-400 dark:text-indigo-500",
    button: "bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-300 dark:hover:bg-indigo-400",
  },
  warning: {
    icon: ExclamationTriangleIcon,
    circle: "bg-yellow-100 dark:bg-yellow-800",
    iconClass: "text-yellow-400 dark:text-yellow-500",
    button: "bg-yellow-600 hover:bg-yellow-500 dark:bg-yellow-300 dark:hover:bg-yellow-400",
  },
}

// COMPUTED
const style = computed(() => (props.type ? styles[props.type] : undefined))

// METHODS
const close = () => {
  if (!props.lockCloseEvent) emit("update:show-modal", false)
}
const clickOK = () => {
  emit("update:show-modal", false)
  emit("update:ok-button", true)
}
const clickCancel = () => emit("update:show-modal", false)
</script>

<template>
  <TransitionRoot as="template" :show="show">
    <Dialog as="div" class="relative z-10" @close="close">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity dark:bg-gray-400/75" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              :class="modalSize"
              class="relative overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 lg:w-full dark:bg-slate-800"
            >
              <div v-if="!lockCloseEvent" class="absolute right-0 top-0 pr-4 pt-4">
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-slate-800 dark:text-gray-500 dark:hover:text-gray-400 dark:focus:ring-indigo-400"
                  @click="close"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="size-6" aria-hidden="true" />
                </button>
              </div>
              <div class="sm:flex sm:items-start">
                <div
                  v-if="style"
                  class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:size-10"
                  :class="style.circle"
                >
                  <component :is="style.icon" class="size-6" :class="style.iconClass" aria-hidden="true" />
                </div>
                <div class="mt-2 text-center sm:ml-4 sm:mt-1 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="text-base font-semibold leading-6 text-gray-900 dark:text-gray-50"
                  >
                    {{ title }}
                  </DialogTitle>
                  <div class="mt-1">
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {{ text }}
                    </p>
                  </div>
                </div>
              </div>
              <hr class="my-4 h-px border-0 bg-gray-200 dark:bg-gray-700" />

              <!-- content -->
              <slot name="content" />

              <!-- buttons -->
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  v-if="showOkButton"
                  type="button"
                  class="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                  :class="style?.button ?? styles.info.button"
                  @click="clickOK"
                >
                  {{ okText }}
                </button>
                <button
                  v-if="showCancelButton"
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto dark:bg-slate-700 dark:text-gray-50 dark:hover:bg-gray-900"
                  @click="clickCancel"
                >
                  {{ cancelText }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
