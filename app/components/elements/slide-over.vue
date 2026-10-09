<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue"
import { XMarkIcon } from "@heroicons/vue/24/outline"

// EMITS
const emit = defineEmits(["update:show-modal"])

// PROPS
withDefaults(defineProps<{ show?: boolean; title?: string }>(), {
  show: false,
  title: "",
})
</script>

<template>
  <TransitionRoot as="template" :show="show">
    <Dialog class="relative z-10" @close="emit('update:show-modal', false)">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity dark:bg-gray-400/75" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto relative w-screen max-w-md">
                <!-- close button outside the panel when there is no title -->
                <div v-if="!title" class="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    class="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white dark:text-gray-600 dark:hover:text-black dark:focus:ring-black"
                    @click="emit('update:show-modal', false)"
                  >
                    <span class="absolute -inset-2.5" />
                    <span class="sr-only">Close panel</span>
                    <XMarkIcon class="size-6" aria-hidden="true" />
                  </button>
                </div>

                <div class="flex h-full flex-col overflow-y-auto bg-white shadow-xl dark:bg-slate-800">
                  <div v-if="title" class="bg-indigo-500 px-4 py-[17.5px] sm:px-6 dark:bg-indigo-400">
                    <div class="flex items-center justify-between">
                      <DialogTitle class="text-base font-semibold text-white dark:text-black">
                        {{ title }}
                      </DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="relative rounded-md bg-indigo-500 text-indigo-200 hover:text-white focus:ring-2 focus:ring-white dark:bg-indigo-400 dark:text-indigo-700"
                          @click="emit('update:show-modal', false)"
                        >
                          <span class="absolute -inset-2.5" />
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="size-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="relative flex-1 px-4 py-6 sm:px-6">
                    <slot name="content" />
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
