<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    description?: string
    layout?: "centered" | "start" | "inline" | "image"
    background?: "none" | "glow" | "solid" | "soft" | "panel" | "photo" | "photo-panel"
    color?: "gray" | "slate" | "indigo" | "violet" | "sky" | "green"
    image?: string
    imageAlt?: string
    // Background photo, only used by the photo and photo-panel backgrounds
    backdrop?: string
    isContent?: boolean
  }>(),
  {
    eyebrow: "",
    title: "",
    description: "",
    layout: "centered",
    background: "none",
    color: "indigo",
    image: "",
    imageAlt: "",
    backdrop: "",
    isContent: false,
  }
)

// DATA
const blobId = useId()
const colors = {
  solid: {
    gray: "bg-gray-900 dark:bg-gray-800",
    slate: "bg-slate-900 dark:bg-slate-800",
    indigo: "bg-indigo-700",
    violet: "bg-violet-700",
    sky: "bg-sky-700",
    green: "bg-green-700",
  },
  soft: {
    gray: "bg-gray-100 dark:bg-gray-800/50",
    slate: "bg-slate-100 dark:bg-slate-800/50",
    indigo: "bg-indigo-100 dark:bg-indigo-950",
    violet: "bg-violet-100 dark:bg-violet-950",
    sky: "bg-sky-100 dark:bg-sky-950",
    green: "bg-green-100 dark:bg-green-950",
  },
  panel: {
    gray: "bg-gray-900 dark:bg-gray-800",
    slate: "bg-slate-900 dark:bg-slate-950",
    indigo: "bg-indigo-900 dark:bg-indigo-950",
    violet: "bg-violet-900 dark:bg-violet-950",
    sky: "bg-sky-900 dark:bg-sky-950",
    green: "bg-green-900 dark:bg-green-950",
  },
}

// COMPUTED
// panel and photo-panel share the rounded card
const panel = computed(() => props.background === "panel" || props.background === "photo-panel")
const backdropped = computed(() => props.background === "photo" || props.background === "photo-panel")
// The image layout falls back to start when there is no image to show
const mode = computed(() => (props.layout === "image" && !props.image ? "start" : props.layout))
const sidePhoto = computed(() => mode.value === "image" && !panel.value)
const screenshot = computed(() => mode.value === "image" && panel.value)
const dark = computed(() => props.background === "solid" || panel.value || backdropped.value)
const fill = computed(() => {
  if (!(props.background in colors)) return ""
  const palette = colors[props.background as keyof typeof colors]
  return palette[props.color] ?? palette.indigo
})
const classes = computed(() => {
  const layouts = {
    centered: {
      outer: "px-6 py-24 sm:py-32 lg:px-8",
      text: "mx-auto max-w-2xl text-center",
      heading: "",
      description: "mx-auto max-w-xl",
      links: "mt-10 justify-center",
    },
    start: {
      outer: "mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8",
      text: "",
      heading: "max-w-2xl",
      description: "",
      links: "mt-10",
    },
    inline: {
      outer: "mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8",
      text: "lg:flex lg:items-center lg:justify-between lg:gap-x-10",
      heading: "max-w-2xl",
      description: "",
      links: "mt-10 lg:mt-0 lg:shrink-0",
    },
    image: screenshot.value
      ? {
          outer: "",
          text: "mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-start",
          heading: "",
          description: "",
          links: "mt-10 justify-center lg:justify-start",
        }
      : {
          outer: "relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40",
          text: "px-6 md:ms-auto md:w-2/3 md:ps-16 lg:w-1/2 lg:pe-0 lg:ps-24 xl:ps-32",
          heading: "",
          description: "",
          links: "mt-10",
        },
  }
  const layout = layouts[mode.value]
  if (!panel.value) return { ...layout, card: "" }
  return {
    ...layout,
    outer: "mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8",
    card: [
      "relative isolate overflow-hidden px-6 shadow-2xl sm:rounded-3xl sm:px-16 dark:shadow-none dark:after:pointer-events-none dark:after:absolute dark:after:inset-0 dark:after:ring-1 dark:after:ring-inset dark:after:ring-white/10 sm:dark:after:rounded-3xl",
      screenshot.value ? "pt-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0" : "py-24",
      fill.value,
    ],
  }
})
const tone = computed(() =>
  dark.value
    ? {
        eyebrow: "text-white/80",
        title: "text-white",
        description: "text-white/80",
        links: "text-white",
      }
    : {
        eyebrow: "text-indigo-600 dark:text-indigo-400",
        title: "text-gray-900 dark:text-white",
        description: "text-gray-600 dark:text-gray-300",
        links: "text-gray-900 dark:text-white",
      }
)
</script>

<template>
  <div class="relative isolate overflow-hidden" :class="panel ? '' : fill">
    <sections-decorations-glow v-if="background === 'glow'" class="left-1/2 top-1/2 -translate-x-1/2" />
    <sections-decorations-photo v-if="background === 'photo'" :src="backdrop" />

    <div
      v-if="sidePhoto"
      class="relative h-80 overflow-hidden md:absolute md:inset-y-0 md:start-0 md:h-full md:w-1/3 lg:w-1/2"
    >
      <img :src="image" :alt="imageAlt" class="size-full object-cover" />
      <svg
        viewBox="0 0 926 676"
        aria-hidden="true"
        class="absolute -bottom-24 start-24 w-[57.875rem] transform-gpu blur-[118px]"
      >
        <path
          :fill="`url(#${blobId})`"
          fill-opacity=".4"
          d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
        />
        <defs>
          <linearGradient
            :id="blobId"
            x1="926.392"
            x2="-109.635"
            y1=".176"
            y2="321.024"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#776FFF" />
            <stop offset="1" stop-color="#FF4694" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <div :class="classes.outer">
      <div :class="classes.card">
        <sections-decorations-photo v-if="background === 'photo-panel'" :src="backdrop" />
        <sections-decorations-glow
          v-if="background === 'panel'"
          :class="
            screenshot
              ? 'left-1/2 top-1/2 -translate-y-1/2 sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0'
              : 'left-1/2 top-1/2 -translate-x-1/2'
          "
        />

        <div :class="classes.text">
          <div :class="classes.heading">
            <p
              v-if="isContent ? $slots.eyebrow : eyebrow"
              class="text-base/7 font-semibold"
              :class="tone.eyebrow"
            >
              <slot v-if="isContent" name="eyebrow" />
              <template v-else>{{ eyebrow }}</template>
            </p>
            <h2
              v-if="isContent ? $slots.title : title"
              class="mt-2 text-balance font-semibold tracking-tight first:mt-0"
              :class="[tone.title, screenshot ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl']"
            >
              <slot v-if="isContent" name="title" />
              <template v-else>{{ title }}</template>
            </h2>
            <p
              v-if="isContent ? $slots.default : description"
              class="mt-6 text-pretty text-lg/8 first:mt-0"
              :class="[tone.description, classes.description]"
            >
              <slot v-if="isContent" />
              <template v-else>{{ description }}</template>
            </p>
          </div>
          <div
            v-if="$slots.links"
            class="flex flex-wrap items-center gap-x-6 gap-y-4 first:mt-0"
            :class="[tone.links, classes.links]"
          >
            <slot name="links" />
          </div>
        </div>

        <div v-if="screenshot" class="relative mt-16 h-80 lg:mt-8">
          <img
            :src="image"
            :alt="imageAlt"
            class="absolute start-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
          />
        </div>
      </div>
    </div>
  </div>
</template>
