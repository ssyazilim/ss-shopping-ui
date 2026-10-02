<template>
  <elements-banner is-content>
    <template v-if="$slots.title" #title>
      <slot name="title" mdc-unwrap="p" />
    </template>
    <template v-if="$slots.default" #default>
      <slot mdc-unwrap="p" />
    </template>
    <template v-if="$slots.action" #action>
      <slot name="action" mdc-unwrap="p" />
    </template>
  </elements-banner>
</template>
