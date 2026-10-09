<script setup lang="ts" generic="T">
import type { Swiper, SwiperOptions } from "swiper/types"

type SwiperElement = HTMLElement & SwiperOptions & { initialize: () => void; swiper?: Swiper }

// PROPS
const props = withDefaults(
  defineProps<{
    items?: T[]
    autoplay?: boolean
    loop?: boolean
    arrows?: boolean
    dots?: boolean
    // Round glass buttons, or the bare chevron
    arrowStyle?: "glass" | "plain"
    // Round dots, dots whose active one stretches, or a short bar that fills up
    dotStyle?: "dots" | "pill" | "progress"
    // How one slide gives way to the next; fade shows a single slide, coverflow and cards fixed-size cards
    effect?: "slide" | "fade" | "coverflow" | "cards"
    // Photo slides carry their dots on the photo; cards keep them in a strip below
    variant?: "photo" | "card"
    // Slides side by side on phones
    phonePerView?: 1 | 2
    // Slides side by side on large screens; tablets show at most two
    perView?: 1 | 2 | 3 | 4
    // Space between slides in pixels
    gap?: number
  }>(),
  {
    items: () => [],
    autoplay: false,
    loop: false,
    arrows: true,
    dots: true,
    arrowStyle: "glass",
    dotStyle: "dots",
    effect: "slide",
    variant: "photo",
    phonePerView: 1,
    perView: 1,
    gap: 0,
  }
)

defineSlots<{ default(props: { item: T; index: number }): unknown }>()

// DATA
const container = ref<SwiperElement>()
const ready = ref(false)
// Arrows sit at the sides and are hidden on phones, where slides are swiped
const arrowClasses =
  "[--swiper-navigation-sides-offset:1rem] [--swiper-navigation-size:2.75rem] [&::part(button-next)]:box-border [&::part(button-prev)]:box-border max-sm:[&::part(button-next)]:hidden max-sm:[&::part(button-prev)]:hidden"
const arrowStyles = {
  glass: [
    "[--swiper-navigation-color:theme(colors.gray.900)] dark:[--swiper-navigation-color:theme(colors.white)]",
    "[&::part(button-next)]:rounded-full [&::part(button-next)]:bg-white/80 [&::part(button-next)]:p-3 [&::part(button-next)]:shadow-sm [&::part(button-next)]:backdrop-blur dark:[&::part(button-next)]:bg-gray-900/70",
    "[&::part(button-prev)]:rounded-full [&::part(button-prev)]:bg-white/80 [&::part(button-prev)]:p-3 [&::part(button-prev)]:shadow-sm [&::part(button-prev)]:backdrop-blur dark:[&::part(button-prev)]:bg-gray-900/70",
  ],
  // White with a shadow, so it reads on light and dark photos alike
  plain:
    "[--swiper-navigation-color:theme(colors.white)] [&::part(button-next)]:p-2 [&::part(button-next)]:drop-shadow-[0_1px_2px_rgb(0_0_0/0.5)] [&::part(button-prev)]:p-2 [&::part(button-prev)]:drop-shadow-[0_1px_2px_rgb(0_0_0/0.5)]",
}
// White on the photo, near its bottom edge
const photoDotClasses =
  "[--swiper-pagination-bottom:1.25rem] [--swiper-pagination-bullet-inactive-color:theme(colors.white)] [--swiper-pagination-bullet-inactive-opacity:0.5] [--swiper-pagination-color:theme(colors.white)] [--swiper-pagination-progressbar-bg-color:rgb(255_255_255/0.5)] [&::part(bullet)]:shadow [&::part(bullet-active)]:shadow"
// Grey in a 2.5rem strip under the cards; the arrows move up by half of it to stay centred on the cards
const cardDotClasses =
  "[--swiper-navigation-top-offset:calc(50%-1.25rem)] [--swiper-pagination-bottom:0px] [--swiper-pagination-bullet-inactive-color:theme(colors.gray.300)] [--swiper-pagination-bullet-inactive-opacity:1] [--swiper-pagination-color:theme(colors.gray.900)] [--swiper-pagination-progressbar-bg-color:theme(colors.gray.300)] dark:[--swiper-pagination-bullet-inactive-color:theme(colors.gray.600)] dark:[--swiper-pagination-color:theme(colors.white)] dark:[--swiper-pagination-progressbar-bg-color:theme(colors.gray.600)] [&::part(container)]:pb-10"
const dotStyles = {
  dots: "",
  pill: "[--swiper-pagination-bullet-border-radius:9999px] [&::part(bullet)]:transition-[width] [&::part(bullet-active)]:w-6 [&::part(bullet-active)]:transition-[width]",
  // A short centred bar, level with where the dots would sit; it fits any number of slides
  progress:
    "[&::part(pagination)]:inset-x-0 [&::part(pagination)]:bottom-[calc(var(--swiper-pagination-bottom)+0.625rem)] [&::part(pagination)]:top-auto [&::part(pagination)]:mx-auto [&::part(pagination)]:w-32 [&::part(pagination)]:overflow-hidden [&::part(pagination)]:rounded-full [&::part(pagination)]:shadow",
}
// Cards of a fixed size around the one in the centre
const coverflowClasses = "[&>swiper-slide]:w-56 sm:[&>swiper-slide]:w-64 lg:[&>swiper-slide]:w-72"
// A single card at the front, the rest stacked behind it
const cardsClasses = "mx-auto w-56 sm:w-64 lg:w-72"
// Slide widths before Swiper starts, matching its breakpoints below (640px = sm, 1024px = lg)
const phoneWidths = {
  1: "[&>swiper-slide]:w-full",
  2: "[&>swiper-slide]:w-[calc((100%-var(--slider-gap))/2)]",
}
const wideWidths = {
  1: "sm:[&>swiper-slide]:w-full",
  2: "sm:[&>swiper-slide]:w-[calc((100%-var(--slider-gap))/2)]",
  3: "sm:[&>swiper-slide]:w-[calc((100%-var(--slider-gap))/2)] lg:[&>swiper-slide]:w-[calc((100%-2*var(--slider-gap))/3)]",
  4: "sm:[&>swiper-slide]:w-[calc((100%-var(--slider-gap))/2)] lg:[&>swiper-slide]:w-[calc((100%-3*var(--slider-gap))/4)]",
}

// COMPUTED
const slides = computed(() => (Array.isArray(props.items) ? props.items : []))
// Swiper reads its options once, so a changed option or slide count mounts a fresh container
const key = computed(() =>
  [
    props.autoplay,
    props.loop,
    props.arrows,
    props.dots,
    props.dotStyle,
    props.effect,
    props.variant,
    props.phonePerView,
    props.perView,
    props.gap,
    slides.value.length,
  ].join("-")
)
const fade = computed(() => props.effect === "fade")
// Coverflow and cards are built around one card, in the centre or at the front
const centred = computed(() => props.effect === "coverflow" || props.effect === "cards")
const effectClasses = computed(() => {
  if (props.effect === "coverflow") return coverflowClasses
  if (props.effect === "cards") return cardsClasses
  return ""
})
const dotClasses = computed(() => {
  if (!props.dots) return ""
  return [props.variant === "card" ? cardDotClasses : photoDotClasses, dotStyles[props.dotStyle]]
})
// Until Swiper starts the slides already sit side by side at their final width, so nothing jumps when it does
const waiting = computed(() => {
  if (props.effect === "cards") return "[&>swiper-slide:not(:first-child)]:hidden"
  const row = "flex gap-x-[var(--slider-gap)] overflow-hidden [&>swiper-slide]:shrink-0"
  // The first card already sits in the centre, half a card width from the middle
  if (props.effect === "coverflow")
    return [row, "ps-[calc(50%-7rem)] sm:ps-[calc(50%-8rem)] lg:ps-[calc(50%-9rem)]"]
  return [row, phoneWidths[fade.value ? 1 : props.phonePerView], wideWidths[fade.value ? 1 : props.perView]]
})

// METHODS
// Let a page move the slider with its own buttons
const prev = () => container.value?.swiper?.slidePrev()
const next = () => container.value?.swiper?.slideNext()
// The card that leaves the centre or the front stays on screen, so its video is stopped here
const pauseOthers = () => {
  const swiper = container.value?.swiper
  if (!swiper) return
  swiper.slides.forEach((slide, index) => {
    if (index !== swiper.activeIndex) slide.querySelectorAll("video").forEach((video) => video.pause())
  })
}
const init = async () => {
  if (!container.value) return
  // Loaded here so only pages that show a slider download Swiper
  const { register } = await import("swiper/element/bundle")
  register()
  const el = container.value
  if (!el) return
  // No autoplay for users who asked for less motion
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const options: SwiperOptions = {
    slidesPerView:
      props.effect === "coverflow" ? "auto" : fade.value || props.effect === "cards" ? 1 : props.phonePerView,
    spaceBetween: props.gap,
    centeredSlides: props.effect === "coverflow",
    // A tap on a card beside the centre or behind the front brings it there
    slideToClickedSlide: centred.value,
    loop: props.loop,
    autoplay:
      props.autoplay && !still
        ? { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }
        : false,
    navigation: props.arrows,
    pagination: props.dots
      ? { clickable: true, type: props.dotStyle === "progress" ? "progressbar" : "bullets" }
      : false,
    effect: props.effect,
    // Without cross-fading the outgoing slide stays visible under the incoming one
    fadeEffect: { crossFade: true },
    // Turned less than Swiper's 50°, and without the shadows Swiper paints over the slides
    coverflowEffect: { rotate: 30, slideShadows: false },
    cardsEffect: { slideShadows: false },
    // The controls of a playing video can be dragged without swiping the slider
    noSwipingSelector: "video[controls]",
    breakpoints:
      props.effect === "slide"
        ? {
            640: { slidesPerView: Math.min(props.perView, 2) },
            1024: { slidesPerView: props.perView },
          }
        : undefined,
  }
  Object.assign(el, options)
  if (centred.value) el.addEventListener("swiperslidechange", pauseOthers)
  // Swiper measures the slides when it starts, so they must be visible by then; it starts before the next paint
  ready.value = true
  await nextTick()
  el.initialize()
}

defineExpose({ prev, next })

// LIFECYCLE
onMounted(init)
watch(key, async () => {
  ready.value = false
  await nextTick()
  await init()
})
</script>

<template>
  <swiper-container
    v-if="slides.length"
    :key="key"
    ref="container"
    :init="false"
    class="z-0 block [&>swiper-slide]:block [&>swiper-slide]:h-auto"
    :class="[
      effectClasses,
      arrows ? [arrowClasses, arrowStyles[arrowStyle]] : '',
      dotClasses,
      ready ? '' : waiting,
    ]"
    :style="{ '--slider-gap': `${gap}px` }"
  >
    <swiper-slide v-for="(item, index) in slides" :key="index">
      <slot :item="item" :index="index" />
    </swiper-slide>
  </swiper-container>
</template>
