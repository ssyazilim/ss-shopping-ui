<script setup lang="ts">
// DATA
const gradientId = useId()
</script>

<template>
  <svg
    viewBox="0 0 1024 1024"
    class="absolute -z-10 size-[64rem] [mask-image:radial-gradient(closest-side,white,transparent)]"
    aria-hidden="true"
  >
    <circle cx="512" cy="512" r="512" :fill="`url(#${gradientId})`" fill-opacity="0.7" />
    <defs>
      <radialGradient :id="gradientId">
        <stop stop-color="#7775D6" />
        <stop offset="1" stop-color="#E935C1" />
      </radialGradient>
    </defs>
  </svg>
</template>
