import type { Directive } from "vue"

type IOnlyNumberElement = HTMLInputElement & {
  __onlyNumberHandlers?: {
    beforeInput: (e: InputEvent) => void
    input: () => void
    onPaste: (e: ClipboardEvent) => void
  }
}

const onlyNumber: Directive<IOnlyNumberElement, boolean> = {
  beforeMount(el, binding) {
    if (!binding.value) return

    const beforeInput = (e: InputEvent) => {
      const deleteTypes = ["deleteContentBackward", "deleteContentForward"]
      if (deleteTypes.includes(e.inputType)) return

      if (!/^[0-9,]$/.test(e.data || "")) {
        e.preventDefault()
        return
      }

      if (e.data === "," && el.value.includes(",")) e.preventDefault()
    }
    const input = () => {
      el.value = el.value.replace(/[^0-9.,]/g, "")
      if (/^0+$/.test(el.value)) el.value = "0"
    }
    const onPaste = (e: ClipboardEvent) => e.preventDefault()

    el.addEventListener("beforeinput", beforeInput)
    el.addEventListener("input", input)
    el.addEventListener("paste", onPaste)
    el.__onlyNumberHandlers = { beforeInput, input, onPaste }
  },
  unmounted(el) {
    const handlers = el.__onlyNumberHandlers
    if (!handlers) return

    el.removeEventListener("beforeinput", handlers.beforeInput)
    el.removeEventListener("input", handlers.input)
    el.removeEventListener("paste", handlers.onPaste)
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("only-number", onlyNumber)
})
