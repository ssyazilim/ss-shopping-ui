<script setup lang="ts">
// EMITS
const emit = defineEmits(["update:image-upload"])

// PROPS
const props = withDefaults(
  defineProps<{
    inputId?: string
    imageClass?: string
    image?: string
    allowedMimeTypes?: string[]
    buttonText?: string
    sizeError?: string
    typeError?: string
  }>(),
  {
    inputId: "upload-image",
    imageClass: "",
    image: "",
    allowedMimeTypes: () => ["image/jpg", "image/jpeg", "image/png", "image/gif"],
    buttonText: "Upload",
    sizeError: "The image must be smaller than 1MB.",
    typeError: "The image must be JPG, GIF or PNG.",
  }
)

// DATA
const fileError = ref("")

// METHODS
const showError = (message: string) => {
  fileError.value = message
  useToast().error(message)
}
const previewFiles = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ""
  if (!file) return

  fileError.value = ""
  if (file.size >= 1024 * 1024) return showError(props.sizeError)
  if (!props.allowedMimeTypes.includes(file.type)) return showError(props.typeError)

  emit("update:image-upload", file)
}
</script>

<template>
  <div class="col-span-full flex items-center gap-x-8">
    <img
      v-if="image"
      :src="image"
      alt=""
      :class="[imageClass, 'flex-none rounded-lg bg-gray-100 object-cover dark:bg-gray-800']"
    />
    <div>
      <div>
        <label
          :for="inputId"
          class="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:ring-gray-600 dark:hover:bg-gray-600"
        >
          {{ buttonText }}
        </label>
        <input
          :id="inputId"
          type="file"
          class="hidden"
          :accept="allowedMimeTypes.join(',')"
          @change="previewFiles"
        />
      </div>

      <p class="ml-1 mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">JPG, GIF or PNG. 1MB max.</p>
      <span v-if="fileError" class="absolute text-xs text-red-600 dark:text-red-300">
        {{ fileError }}
      </span>
    </div>
  </div>
</template>
