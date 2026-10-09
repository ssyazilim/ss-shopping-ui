<script setup lang="ts">
// PROPS
const props = withDefaults(
  defineProps<{
    person: {
      name: string
      role: string
      image: string
      bio: string
      location: string
      icon: string
      link: string
    }
    personStyle?: "inline" | "avatar" | "circle" | "photo" | "row"
    // Single-column rows sit side by side from sm, multi-column rows only from xl
    wide?: boolean
    card?: boolean
  }>(),
  {
    personStyle: "photo",
    wide: false,
    card: false,
  }
)

// COMPUTED
const centered = computed(() => props.personStyle === "avatar" || props.personStyle === "circle")
const external = computed(() => /^(https?:)?\/\//.test(props.person.link || ""))
const linkLabel = computed(() => {
  const link = props.person.link || ""
  if (!external.value) return link
  try {
    return new URL(link.startsWith("//") ? `https:${link}` : link).hostname.replace(/^www\./, "")
  } catch {
    return link
  }
})
const classes = computed(() => {
  switch (props.personStyle) {
    case "inline":
      return {
        wrapper: ["flex gap-x-6", props.person.bio ? "items-start" : "items-center"],
        image: "size-16 flex-none rounded-full",
        name: "text-base/7",
        role: "text-sm/6 font-semibold text-indigo-600 dark:text-indigo-400",
        extra: "mt-4",
      }
    case "avatar":
      return {
        wrapper: "",
        image: "mx-auto size-24 rounded-full",
        name: "mt-6 text-base/7",
        role: "text-sm/6 text-gray-600 dark:text-gray-400",
        extra: "mt-4",
      }
    case "circle":
      return {
        wrapper: "",
        image: "mx-auto aspect-square w-full max-w-48 rounded-full object-cover md:max-w-56",
        name: "mt-6 text-base/7",
        role: "text-sm/6 text-gray-600 dark:text-gray-400",
        extra: "mt-4",
      }
    case "row":
      return {
        wrapper: ["flex flex-col gap-6", props.wide ? "sm:flex-row sm:gap-10" : "xl:flex-row"],
        image: "aspect-[4/5] w-52 flex-none rounded-2xl object-cover",
        name: "text-lg/8",
        role: "text-base/7 text-gray-600 dark:text-gray-400",
        extra: "mt-6",
      }
    default:
      return {
        wrapper: "",
        image: "aspect-[3/2] w-full rounded-2xl object-cover",
        name: "mt-6 text-lg/8",
        role: "text-base/7 text-gray-600 dark:text-gray-400",
        extra: "mt-4",
      }
  }
})
</script>

<template>
  <li :class="{ 'text-center': centered, 'rounded-2xl bg-gray-100 px-8 py-10 dark:bg-white/5': card }">
    <div :class="classes.wrapper">
      <img
        v-if="person.image"
        :src="person.image"
        alt=""
        class="bg-gray-100 outline outline-1 -outline-offset-1 outline-black/5 dark:bg-gray-800 dark:outline-white/10"
        :class="classes.image"
      />
      <div :class="{ 'max-w-xl flex-auto': personStyle === 'row' }">
        <h3
          class="font-semibold tracking-tight text-gray-900 first:mt-0 dark:text-white"
          :class="classes.name"
        >
          {{ person.name }}
        </h3>
        <p v-if="person.role" :class="classes.role">{{ person.role }}</p>
        <p v-if="person.location" class="text-sm/6 text-gray-500 dark:text-gray-400">{{ person.location }}</p>
        <p v-if="person.bio" class="text-base/7 text-gray-600 dark:text-gray-400" :class="classes.extra">
          {{ person.bio }}
        </p>
        <div v-if="person.icon" class="mt-6 flex" :class="{ 'justify-center': centered }">
          <NuxtLink
            v-if="person.link"
            :to="person.link"
            :target="external ? '_blank' : undefined"
            class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <span class="sr-only">{{ linkLabel }}</span>
            <Icon :name="person.icon" class="size-5" aria-hidden="true" />
          </NuxtLink>
          <Icon v-else :name="person.icon" class="size-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>
    </div>
  </li>
</template>
