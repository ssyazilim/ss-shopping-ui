<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    header?: string
    rows?: { cells: string }[]
    variant?: "plain" | "card" | "bordered"
    striped?: boolean
    divided?: boolean
    compact?: boolean
  }>(),
  {
    header: "",
    rows: () => [],
    variant: "plain",
    striped: false,
    divided: false,
    compact: false,
  }
)

// METHODS
// "S | 36 | 88–92" → ["S", "36", "88–92"]; outer pipes as in markdown tables ("| S | 36 |") are allowed
const split = (text: string) =>
  String(text ?? "")
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim())

// COMPUTED
const headerCells = computed(() => (props.header.trim() ? split(props.header) : []))
const rowCells = computed(() =>
  (Array.isArray(props.rows) ? props.rows : [])
    .map((row) => split(row?.cells ?? ""))
    .filter((cells) => cells.some(Boolean))
)
const columns = computed(() => {
  const count = Math.max(headerCells.value.length, ...rowCells.value.map((cells) => cells.length), 0)
  return Array.from({ length: count }, (_, i) => ({ key: `c${i}`, label: headerCells.value[i] ?? "" }))
})
const items = computed(() =>
  rowCells.value.map((cells) => Object.fromEntries(cells.map((cell, i) => [`c${i}`, cell])))
)
</script>

<template>
  <data-displays-table
    :columns="columns"
    :rows="items"
    :variant="variant"
    :striped="striped"
    :divided="divided"
    :compact="compact"
  />
</template>
