<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router"

// TYPES
type ITab = { label: string; to?: RouteLocationRaw; value?: string }

// MODEL
const model = defineModel<string>({ default: "" })

// PROPS
const props = withDefaults(
  defineProps<{
    tabs?: ITab[]
    uniqueId?: string
    labelTitle?: string
  }>(),
  {
    tabs: () => [],
    uniqueId: "tabs",
    labelTitle: "Select a tab",
  }
)

// DATA
const route = useRoute()
const router = useRouter()
const tabClass = "ml-2 whitespace-nowrap border-b-2 px-1 py-2 text-sm font-medium"
const activeClass = "border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-300"
const passiveClass =
  "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200"

// METHODS
const tabKey = (tab: ITab) => (tab.to ? router.resolve(tab.to).path : (tab.value ?? tab.label))
const isActive = (tab: ITab) =>
  tab.to ? route.path === router.resolve(tab.to).path : tab.value === model.value

// COMPUTED
const selectedKey = computed({
  get: () => {
    const tab = props.tabs.find(isActive)
    return tab ? tabKey(tab) : ""
  },
  set: (key: string) => {
    const tab = props.tabs.find((item) => tabKey(item) === key)
    if (!tab) return
    if (tab.to) navigateTo(tab.to)
    else model.value = tab.value ?? ""
  },
})
</script>

<template>
  <div>
    <!-- mobile -->
    <div class="xl:hidden">
      <label :for="uniqueId" class="sr-only">{{ labelTitle }}</label>
      <select
        :id="uniqueId"
        v-model="selectedKey"
        class="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-base text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 dark:bg-slate-700 dark:text-gray-50 dark:ring-gray-600 dark:focus:ring-indigo-400"
      >
        <option v-for="tab in tabs" :key="tabKey(tab)" :value="tabKey(tab)">{{ tab.label }}</option>
      </select>
    </div>

    <!-- desktop -->
    <nav class="hidden border-b border-gray-200 xl:block dark:border-gray-700" :aria-label="labelTitle">
      <div class="-mb-px flex space-x-8">
        <template v-for="tab in tabs" :key="tabKey(tab)">
          <nuxt-link
            v-if="tab.to"
            :to="tab.to"
            :class="[tabClass, isActive(tab) ? activeClass : passiveClass]"
            :aria-current="isActive(tab) ? 'page' : undefined"
          >
            {{ tab.label }}
          </nuxt-link>
          <button
            v-else
            type="button"
            :class="[tabClass, isActive(tab) ? activeClass : passiveClass]"
            :aria-current="isActive(tab) ? 'true' : undefined"
            @click="model = tab.value ?? ''"
          >
            {{ tab.label }}
          </button>
        </template>
      </div>
    </nav>
  </div>
</template>
