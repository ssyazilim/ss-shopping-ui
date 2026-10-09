<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue"
import { ChevronRightIcon } from "@heroicons/vue/24/outline"
import type { INavigation } from "@ssyazilim/ss-shopping-schemas"

// EMITS
const emit = defineEmits(["update:sidebar-open"])

// PROPS
withDefaults(
  defineProps<{
    navigation?: INavigation[]
    collapsed?: boolean
  }>(),
  {
    navigation: () => [],
    collapsed: false,
  }
)

// DATA
const currentIndex = ref<number | null>(null)
const itemClass =
  "group flex w-full items-center p-2 text-left text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-50"
const childClass =
  "group flex items-center border-l-4 border-transparent px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-50"

// METHODS
const iconClass = (index: number) => [
  currentIndex.value === index
    ? "text-gray-900 dark:text-indigo-50"
    : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400",
  "size-6 shrink-0",
]
</script>

<template>
  <nav>
    <ul role="list" class="mx-auto max-w-4xl divide-y divide-gray-900/10">
      <li
        v-for="(parent, parentIdx) in navigation"
        :key="parent.name"
        @mouseover="currentIndex = parentIdx"
        @mouseleave="currentIndex = null"
      >
        <!-- single item -->
        <nuxt-link
          v-if="parent.subItems.length === 0"
          :to="parent.to"
          active-class="text-indigo-600 dark:text-indigo-300"
          :class="[itemClass, collapsed ? 'justify-center' : 'gap-x-3']"
          :title="collapsed ? parent.name : undefined"
          @click="emit('update:sidebar-open', false)"
        >
          <component :is="parent.icon" :class="iconClass(parentIdx)" aria-hidden="true" />
          <span v-if="!collapsed">{{ parent.name }}</span>
        </nuxt-link>

        <!-- group -->
        <Disclosure v-else v-slot="{ open }" :default-open="true">
          <DisclosureButton
            :class="[itemClass, collapsed ? 'justify-center' : 'justify-between']"
            :title="collapsed ? parent.name : undefined"
          >
            <span class="flex items-center gap-x-3">
              <component :is="parent.icon" :class="iconClass(parentIdx)" aria-hidden="true" />
              <span v-if="!collapsed">{{ parent.name }}</span>
            </span>
            <ChevronRightIcon
              v-if="!collapsed"
              class="mr-2 size-4 text-gray-500 transition-transform duration-200 motion-reduce:transition-none dark:text-gray-400"
              :class="open ? 'rotate-90' : ''"
              aria-hidden="true"
            />
          </DisclosureButton>
          <DisclosurePanel as="ul" role="list" :class="collapsed ? '' : 'pr-12'">
            <li v-for="child in parent.subItems" :key="child.name" class="mt-2">
              <nuxt-link
                :to="child.to"
                active-class="text-indigo-600 dark:text-indigo-300"
                :class="[childClass, collapsed ? 'justify-center' : 'gap-x-3']"
                :title="collapsed ? child.name : undefined"
                @click="emit('update:sidebar-open', false)"
              >
                <component
                  :is="child.icon"
                  class="size-6 shrink-0 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400"
                  aria-hidden="true"
                />
                <span v-if="!collapsed">{{ child.name }}</span>
              </nuxt-link>
            </li>
          </DisclosurePanel>
        </Disclosure>
      </li>
    </ul>
  </nav>
</template>
