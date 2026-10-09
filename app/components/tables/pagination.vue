<script setup lang="ts">
import {
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/20/solid"

// TYPES
type IPaginationLabels = {
  previous: string
  next: string
  first: string
  last: string
  showing: string
  to: string
  of: string
  results: string
}

// EMITS
const emit = defineEmits(["update:page-changed"])

// PROPS
const props = withDefaults(
  defineProps<{
    totalCount?: number
    pageSize?: number
    totalPage?: number
    currentPage?: number
    maxVisibleButtons?: number
    labels?: Partial<IPaginationLabels>
  }>(),
  {
    totalCount: 0,
    pageSize: 25,
    totalPage: 1,
    currentPage: 1,
    maxVisibleButtons: 5,
    labels: () => ({}),
  }
)

// DATA
const navClass =
  "relative inline-flex items-center px-2 py-1 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 dark:ring-gray-600 disabled:cursor-not-allowed disabled:text-gray-400 dark:disabled:text-gray-500 enabled:text-gray-900 enabled:hover:bg-gray-50 dark:enabled:text-gray-50 dark:enabled:hover:bg-gray-900"

// COMPUTED
const text = computed<IPaginationLabels>(() => ({
  previous: "Previous",
  next: "Next",
  first: "First",
  last: "Last",
  showing: "Showing",
  to: "to",
  of: "of",
  results: "results",
  ...props.labels,
}))
const isInFirstPage = computed(() => props.currentPage <= 1)
const isInLastPage = computed(() => props.currentPage >= props.totalPage)
const pages = computed(() => {
  const count = Math.min(props.maxVisibleButtons, props.totalPage)
  const start = Math.min(Math.max(props.currentPage - Math.floor(count / 2), 1), props.totalPage - count + 1)
  return Array.from({ length: count }, (_, index) => start + index)
})
const from = computed(() => (props.currentPage - 1) * props.pageSize + 1)
const to = computed(() => Math.min(props.currentPage * props.pageSize, props.totalCount))

// METHODS
const gotoPage = (page: number) => {
  if (page !== props.currentPage) emit("update:page-changed", page)
}
</script>

<template>
  <div
    v-if="totalPage > 1"
    class="flex items-center justify-between border-t border-gray-200 bg-white px-1 py-3 sm:px-2 dark:border-gray-700 dark:bg-slate-800"
  >
    <!-- mobile -->
    <div class="flex flex-1 justify-between md:hidden">
      <button
        type="button"
        :class="[navClass, 'rounded-md px-4 py-2']"
        :disabled="isInFirstPage"
        @click="gotoPage(currentPage - 1)"
      >
        {{ text.previous }}
      </button>
      <button
        type="button"
        :class="[navClass, 'rounded-md px-4 py-2']"
        :disabled="isInLastPage"
        @click="gotoPage(currentPage + 1)"
      >
        {{ text.next }}
      </button>
    </div>

    <!-- desktop -->
    <div class="hidden md:flex md:flex-1 md:items-center md:justify-between">
      <p class="text-sm text-gray-700 dark:text-gray-200">
        {{ text.showing }} <span class="font-medium">{{ from }}</span> {{ text.to }}
        <span class="font-medium">{{ to }}</span> {{ text.of }}
        <span class="font-medium">{{ totalCount }}</span>
        {{ text.results }}
      </p>
      <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <button
          type="button"
          :class="[navClass, 'rounded-l-md']"
          :disabled="isInFirstPage"
          @click="gotoPage(1)"
        >
          <span class="sr-only">{{ text.first }}</span>
          <ChevronDoubleLeftIcon class="size-5" aria-hidden="true" />
        </button>
        <button type="button" :class="navClass" :disabled="isInFirstPage" @click="gotoPage(currentPage - 1)">
          <span class="sr-only">{{ text.previous }}</span>
          <ChevronLeftIcon class="size-5" aria-hidden="true" />
        </button>
        <button
          v-for="page in pages"
          :key="page"
          type="button"
          :aria-current="page === currentPage ? 'page' : undefined"
          :class="[
            page === currentPage
              ? 'z-10 bg-indigo-600 text-white dark:bg-indigo-300 dark:text-gray-900'
              : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:text-gray-50 dark:ring-gray-600 dark:hover:bg-gray-900',
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-300',
          ]"
          @click="gotoPage(page)"
        >
          {{ page }}
        </button>
        <button type="button" :class="navClass" :disabled="isInLastPage" @click="gotoPage(currentPage + 1)">
          <span class="sr-only">{{ text.next }}</span>
          <ChevronRightIcon class="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          :class="[navClass, 'rounded-r-md']"
          :disabled="isInLastPage"
          @click="gotoPage(totalPage)"
        >
          <span class="sr-only">{{ text.last }}</span>
          <ChevronDoubleRightIcon class="size-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  </div>
</template>
