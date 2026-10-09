<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{
    leftWidth?: "quarter" | "third" | "half"
    rightWidth?: "quarter" | "third" | "half"
    divided?: boolean
    sticky?: boolean
  }>(),
  {
    leftWidth: "third",
    rightWidth: "third",
    divided: false,
    sticky: false,
  }
)

// DATA
// Shares of a 12-part row; the main column takes what is left (at least a quarter)
const shares = { quarter: 3, third: 4, half: 6 }

// METHODS
const slots = useSlots()
// Slots are not reactive, so the columns are worked out on every render instead of in a computed
const getColumns = () => {
  const left = slots.left ? shares[props.leftWidth] : 0
  const right = slots.right ? shares[props.rightWidth] : 0
  return [
    { name: "left", share: left },
    { name: "default", share: slots.default ? Math.max(12 - left - right, 3) : 0 },
    { name: "right", share: right },
  ].filter((column) => column.share)
}
const getTemplate = () =>
  getColumns()
    .map((column) => `minmax(0,${column.share}fr)`)
    .join(" ")
const getClasses = (name: string, index: number, count: number) => {
  const side = name !== "default"
  const hasMain = getColumns().some((column) => column.name === "default")
  return [
    { "lg:sticky lg:top-8 lg:self-start": props.sticky && side },
    props.divided && [
      "border-gray-200 dark:border-white/10",
      // Stacked: a line above every column but the first; side by side: lines on the main column's edges
      { "border-t pt-8 lg:border-t-0 lg:pt-0": index > 0 },
      name === "default" && { "lg:border-s lg:ps-8": index > 0, "lg:border-e lg:pe-8": index < count - 1 },
      !hasMain && name === "right" && index > 0 && "lg:border-s lg:ps-8",
    ],
  ]
}
</script>

<template>
  <div
    v-if="getColumns().length"
    class="grid grid-cols-1 gap-8 lg:[grid-template-columns:var(--columns)]"
    :style="{ '--columns': getTemplate() }"
  >
    <div
      v-for="(column, index) in getColumns()"
      :key="column.name"
      :class="getClasses(column.name, index, getColumns().length)"
    >
      <slot :name="column.name" />
    </div>
  </div>
</template>
