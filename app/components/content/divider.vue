<template>
  <elements-divider is-content>
    <template v-if="$slots.default" #default>
      <slot mdc-unwrap="p" />
    </template>
  </elements-divider>
</template>
