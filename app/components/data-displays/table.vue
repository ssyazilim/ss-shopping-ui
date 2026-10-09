<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{
    columns?: { key: string; label: string; align?: "start" | "end" }[]
    rows?: Record<string, unknown>[]
    variant?: "plain" | "card" | "bordered"
    striped?: boolean
    // Vertical lines between columns
    divided?: boolean
    compact?: boolean
  }>(),
  {
    columns: () => [],
    rows: () => [],
    variant: "plain",
    striped: false,
    divided: false,
    compact: false,
  }
)

// DATA
const frames = {
  plain: "",
  card: "overflow-hidden rounded-lg bg-white shadow outline outline-1 outline-black/5 dark:bg-gray-800/50 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10",
  bordered: "overflow-hidden rounded-lg ring-1 ring-gray-300 dark:ring-white/15",
}

// COMPUTED
const hasHeader = computed(() => props.columns.some((column) => column.label))
const lines = computed(() => (props.divided ? "divide-x divide-gray-200 dark:divide-white/10" : ""))

// METHODS
// The plain table lines its outer cells up with the surrounding content; framed tables pad them
const padding = (index: number) => {
  const inner = props.compact ? "px-2" : props.divided ? "px-4" : "px-3"
  const last = index === props.columns.length - 1
  if (props.variant === "plain") return index === 0 ? "pe-3 ps-0" : last ? "pe-0 ps-3" : inner
  return index === 0 ? "pe-3 ps-4 sm:ps-6" : last ? "pe-4 ps-3 sm:pe-6" : inner
}
const align = (column: { align?: "start" | "end" }) => (column.align === "end" ? "text-end" : "text-start")
const value = (row: Record<string, unknown>, key: string) => {
  const cell = row?.[key]
  return cell === undefined || cell === null ? "" : String(cell)
}
</script>

<template>
  <div v-if="columns.length" :class="frames[variant]">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-300 dark:divide-white/15">
        <thead v-if="hasHeader" :class="{ 'bg-gray-50 dark:bg-gray-800/75': variant === 'card' }">
          <tr :class="lines">
            <th
              v-for="(column, i) in columns"
              :key="column.key"
              scope="col"
              class="whitespace-nowrap py-3.5 text-sm font-semibold text-gray-900 dark:text-white"
              :class="[padding(i), align(column)]"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody
          :class="[
            { 'divide-y divide-gray-200 dark:divide-white/10': !striped },
            { 'bg-white dark:bg-transparent': variant === 'card' },
          ]"
        >
          <tr
            v-for="(row, r) in rows"
            :key="r"
            :class="[lines, { 'even:bg-gray-50 dark:even:bg-gray-800/50': striped }]"
          >
            <td
              v-for="(column, i) in columns"
              :key="column.key"
              class="text-sm"
              :class="[
                padding(i),
                align(column),
                compact ? 'py-2' : 'py-4',
                i === 0 ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400',
              ]"
            >
              <slot :name="`cell-${column.key}`" :row="row" :value="row?.[column.key]" :index="r">
                {{ value(row, column.key) }}
              </slot>
            </td>
          </tr>
        </tbody>
        <!-- App code puts summary rows (subtotal, tax, total) here -->
        <tfoot v-if="$slots.footer">
          <slot name="footer" />
        </tfoot>
      </table>
    </div>
  </div>
</template>
