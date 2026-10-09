<script setup lang="ts">
import { PlayIcon } from "@heroicons/vue/24/solid"

// PROPS
const props = withDefaults(
  defineProps<{
    src?: string
  }>(),
  {
    src: "",
  }
)

// DATA
const video = ref<HTMLVideoElement>()
// The video is fetched only once the card has been on screen
const seen = ref(false)
const started = ref(false)
let observer: IntersectionObserver | undefined

// COMPUTED
// #t makes Safari paint the first frame as a cover, other browsers do it with preload="metadata" alone
const source = computed(() => (seen.value && props.src ? `${props.src}#t=0.1` : undefined))

// METHODS
const stop = () => {
  started.value = false
}
const play = async () => {
  started.value = true
  await nextTick()
  // A file the browser can't play brings the cover back
  await video.value?.play().catch(stop)
}

// LIFECYCLE
onMounted(() => {
  if (!video.value) return
  observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) seen.value = true
    // A video swiped or scrolled out of sight stops
    else video.value?.pause()
  })
  observer.observe(video.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="relative aspect-[9/16] overflow-hidden rounded-lg bg-gray-900">
    <video
      ref="video"
      :src="source"
      preload="metadata"
      playsinline
      :controls="started"
      class="size-full object-cover"
      @ended="stop"
    />
    <button
      v-if="!started"
      type="button"
      class="group absolute inset-0 flex items-center justify-center"
      aria-label="Play"
      @click="play"
    >
      <span
        class="flex size-14 items-center justify-center rounded-full bg-white/80 text-gray-900 shadow-sm backdrop-blur transition group-hover:scale-110 dark:bg-gray-900/70 dark:text-white"
      >
        <PlayIcon class="ms-0.5 size-6" aria-hidden="true" />
      </span>
    </button>
  </div>
</template>
